import { useState } from 'react';
import AreaChartComponent from './AreaChartComponent';
import BarChartComponent from './BarChartComponent';
import { useAppContext } from '../context/appContext';
import styled from 'styled-components';

const ChartsContainer = () => {
	const [barChart, setBarChart] = useState(true);
	const { monthlyApplications: data } = useAppContext();
	return (
		<Wrapper>
			<h4>Monthly Applications</h4>
			<button type='button' onClick={() => setBarChart(!barChart)}>
				{barChart ? 'Area Chart' : 'Bar chart'}
			</button>
			{barChart ? (
				<BarChartComponent data={data} />
			) : (
				<AreaChartComponent data={data} />
			)}
		</Wrapper>
	);
};

const Wrapper = styled.section`
	margin-top: 4rem;
	text-align: center;
	button {
		background: transparent;
		border-color: transparent;
		text-transform: capitalize;
		color: var(--primary-500);
		font-size: 1.25rem;
		cursor: pointer;
	}
	h4 {
		text-align: center;
		margin-bottom: 0.75rem;
	}
`;

export default ChartsContainer;
