import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import {
	BadRequestError,
	UnauthenticatedError,
	NotFoundError,
} from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';
import mongoose from 'mongoose';
import moment from 'moment';

const createJob = async (req, res) => {
	const { position, company } = req.body;

	if (!position || !company) {
		throw new BadRequestError('Please provide all values');
	}
	req.body.createdBy = req.user.userId;
	const job = await Job.create(req.body);
	res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
	const { id: jobId } = req.params;

	const { company, position } = req.body;

	if (!company || !position) {
		throw new BadRequestError('Please provide all values');
	}

	const job = await Job.findOne({ _id: jobId });

	if (!job) {
		throw new NotFoundError(`No job with id ${jobId}`);
	}

	checkPermissions(req.user, job.createdBy);
	// checkPermissions(req.user);

	const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(StatusCodes.OK).json({ updatedJob });
};

const deleteJob = async (req, res) => {
	const { id: jobId } = req.params;

	const job = await Job.findOne({ _id: jobId });

	if (!job) {
		throw new NotFoundError(`No job found with id ${jobId}`);
	}

	checkPermissions(req.user, job.createdBy);

	await job.remove();

	res.status(StatusCodes.OK).json({ msg: 'Success! Job removed.' });
};

const getAllJobs = async (req, res) => {
	const { search, jobType, sort, status } = req.query;

	const queryObject = {
		createdBy: req.user.userId,
	};

	if (status && status !== 'all') {
		queryObject.status = status;
	}
	if (jobType && jobType !== 'all') {
		queryObject.jobType = jobType;
	}

	if (search && search) {
		queryObject.position = { $regex: search, $options: 'i' };
	}

	let result = Job.find(queryObject);

	switch (sort) {
		case 'latest':
			result = result.sort('-createdAt');
			break;
		case 'oldest':
			result = result.sort('createdAt');
			break;
		case 'a-z':
			result = result.sort('position');
			break;
		case 'z-a':
			result = result.sort('-position');
			break;
		default:
			break;
	}

	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;

	result = result.skip(skip).limit(limit);

	const jobs = await result;

	const totalJobs = await Job.countDocuments(queryObject);
	const numOfPages = Math.ceil(totalJobs / limit);

	res.status(StatusCodes.OK).json({
		jobs,
		totalJobs,
		numOfPages,
	});
};

const showStats = async (req, res) => {
	let stats = await Job.aggregate([
		{ $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
		{ $group: { _id: '$status', count: { $sum: 1 } } },
	]);
	stats = stats.reduce((acc, curr) => {
		const { _id: title, count } = curr;
		acc[title] = count;
		return acc;
	}, {});

	const defaultStats = {
		pending: stats.pending || 0,
		interview: stats.interview || 0,
		declined: stats.declined || 0,
	};

	let monthlyApplications = await Job.aggregate([
		{ $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
		{
			$group: {
				_id: {
					year: {
						$year: '$createdAt',
					},
					month: {
						$month: '$createdAt',
					},
				},
				count: { $sum: 1 },
			},
		},
		{ $sort: { '_id.year': -1, '_id.month': -1 } },
		// { $limit: 6 },
	]);

	monthlyApplications = monthlyApplications
		.map((item) => {
			const {
				_id: { month, year },
				count,
			} = item;
			const date = moment()
				.month(month - 1)
				.year(year)
				.format('MMM Y');
			return { date, count };
		})
		.reverse();

	res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export { createJob, updateJob, deleteJob, getAllJobs, showStats };
