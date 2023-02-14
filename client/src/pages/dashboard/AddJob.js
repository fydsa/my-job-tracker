import { FormRow, Alert, FormRowSelect } from '../../components';
import { useAppContext } from '../../context/appContext';
import styled from 'styled-components';

const AddJob = () => {
	const {
		showAlert,
		displayAlert,
		position,
		company,
		jobType,
		jobTypeOptions,
		jobLocation,
		status,
		statusOptions,
		isEditing,
		handleChange,
		clearValues,
		isLoading,
		createJob,
		editJob,
	} = useAppContext();

	const handleJobInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		handleChange({ name, value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!position || !company || !jobLocation) {
			displayAlert();
			return;
		}
		if (isEditing) {
			editJob();
			return;
		}
		createJob();
	};

	return (
		<Wrapper>
			<form className='form' onSubmit={handleSubmit}>
				<h3>{isEditing ? 'Edit job' : 'add job'}</h3>
				{showAlert && <Alert />}
				<div className='form-center'>
					<FormRow
						type='text'
						name='position'
						value={position}
						handleChange={handleJobInput}
					/>
					<FormRow
						type='text'
						name='company'
						value={company}
						handleChange={handleJobInput}
					/>
					<FormRow
						type='text'
						name='jobLocation'
						value={jobLocation}
						labelText='Job location'
						handleChange={handleJobInput}
					/>
					<FormRowSelect
						name='status'
						value={status}
						handleChange={handleJobInput}
						list={statusOptions}
					/>
					<FormRowSelect
						labelText='jobType'
						name='jobType'
						value={jobType}
						handleChange={handleJobInput}
						list={jobTypeOptions}
					/>
					<div className='btn-container'>
						<button
							type='submit'
							className='btn btn-block submit-btn'
							disabled={isLoading}
						>
							Submit
						</button>
						<button
							className='btn btn-block clear-btn'
							onClick={(e) => {
								e.preventDefault();
								clearValues();
							}}
						>
							Clear
						</button>
					</div>
				</div>
			</form>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	border-radius: var(--borderRadius);
	width: 100%;
	background: var(--white);
	padding: 3rem 2rem 4rem;
	box-shadow: var(--shadow-2);
	h3 {
		margin-top: 0;
	}
	.form {
		margin: 0;
		border-radius: 0;
		box-shadow: none;
		padding: 0;
		max-width: 100%;
		width: 100%;
	}
	.form-row {
		margin-bottom: 0;
	}
	.form-center {
		display: grid;
		row-gap: 0.5rem;
	}
	.form-center button {
		align-self: end;
		height: 35px;
		margin-top: 1rem;
	}
	.btn-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 1rem;
		align-self: flex-end;
		margin-top: 0.5rem;
		button {
			height: 35px;
		}
	}
	.clear-btn {
		background: var(--grey-500);
	}
	.clear-btn:hover {
		background: var(--black);
	}
	@media (min-width: 992px) {
		.form-center {
			grid-template-columns: 1fr 1fr;
			align-items: center;
			column-gap: 1rem;
		}
		.btn-container {
			margin-top: 0;
		}
	}
	@media (min-width: 1120px) {
		.form-center {
			grid-template-columns: 1fr 1fr 1fr;
		}
		.form-center button {
			margin-top: 0;
		}
	}
`;

export default AddJob;
