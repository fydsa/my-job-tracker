import { FormRow, FormRowSelect } from '.';
import { useAppContext } from '../context/appContext';
import styled from 'styled-components';

const SearchContainer = () => {
	const {
		isLoading,
		search,
		searchStatus,
		searchType,
		sort,
		sortOptions,
		jobTypeOptions,
		statusOptions,
		handleChange,
		clearFilters,
	} = useAppContext();

	const handleSearch = (e) => {
		if (isLoading) return;
		handleChange({ name: e.target.name, value: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		clearFilters();
	};

	// if (isLoading) return <Loading />;

	return (
		<Wrapper>
			<form className='form'>
				<h4>seach form</h4>
				<div className='form-center'>
					<FormRow
						type='text'
						name='search'
						value={search}
						handleChange={handleSearch}
					/>
					<FormRowSelect
						labelText='job status'
						name='searchStatus'
						value={searchStatus}
						handleChange={handleSearch}
						list={['all', ...statusOptions]}
					/>
					<FormRowSelect
						labelText='type'
						name='searchType'
						value={searchType}
						handleChange={handleSearch}
						list={['all', ...jobTypeOptions]}
					/>
					<FormRowSelect
						name='sort'
						value={sort}
						handleChange={handleSearch}
						list={sortOptions}
					/>
					<button
						className='btn btn-block btn-danger'
						disabled={isLoading}
						onClick={handleSubmit}
					>
						Clear filters
					</button>
				</div>
				{/* <FormRow
					type='text'
					name='text'
					value={search}
					handleChange={handleChange}
				/>
				<FormRow
					type='text'
					name='text'
					value={search}
					handleChange={handleChange}
				/>
				<FormRow
					type='text'
					name='text'
					value={search}
					handleChange={handleChange}
				/> */}
			</form>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	.form {
		width: 100%;
		max-width: 100%;
	}
	.form-input,
	.form-select,
	.btn-block {
		height: 35px;
	}
	.form-row {
		margin-bottom: 0;
	}
	.form-center {
		display: grid;
		grid-template-columns: 1fr;
		column-gap: 2rem;
		row-gap: 0.5rem;
	}
	h5 {
		font-weight: 700;
	}
	.btn-block {
		align-self: end;
		margin-top: 1rem;
	}
	@media (min-width: 768px) {
		.form-center {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (min-width: 992px) {
		.form-center {
			grid-template-columns: 1fr 1fr 1fr;
		}
		.btn-block {
			margin-top: 0;
		}
	}
`;

export default SearchContainer;
