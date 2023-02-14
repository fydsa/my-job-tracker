import { useEffect } from 'react';
import Loading from './Loading';
import Job from './Job';
import styled from 'styled-components';
import { useAppContext } from '../context/appContext';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = () => {
	const {
		getJobs,
		jobs,
		isLoading,
		page,
		totalJobs,
		search,
		searchStatus,
		searchType,
		sort,
		numOfPages,
	} = useAppContext();

	useEffect(() => {
		getJobs();
		// eslint-disable-next-line
	}, [search, searchStatus, searchType, sort, page]);

	if (isLoading) {
		return <Loading center />;
	}
	if (jobs.length === 0) {
		return (
			<Wrapper>
				<h2>No jobs to display...</h2>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<h5>
				{totalJobs} job{jobs.length > 1 && 's'} found
			</h5>
			<div className='jobs'>
				{jobs.map((job, i) => {
					return <Job key={i} {...job} />;
				})}
			</div>
			{numOfPages > 1 && <PageBtnContainer />}
		</Wrapper>
	);
};

const Wrapper = styled.section`
	margin-top: 4rem;
	h2 {
		text-transform: none;
	}
	& > h5 {
		font-weight: 700;
	}
	.jobs {
		display: grid;
		grid-template-columns: 1fr;
		row-gap: 2rem;
	}
	@media (min-width: 992px) {
		.jobs {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 1rem;
		}
	}
`;

export default JobsContainer;
