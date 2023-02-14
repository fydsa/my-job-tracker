import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';

const AreaChartComponent = ({ data }) => {
	return (
		<ResponsiveContainer width='100%' height={300}>
			<AreaChart data={data} margin={{ top: 50 }}>
				<CartesianGrid strokeDashArray='3 3 ' />
				<XAxis dataKey='date' />
				<YAxis allowDecimals={false} />
				<Tooltip />
				<Area dataKey='count' fill='#8b5cf6' barSize={75} />
			</AreaChart>
		</ResponsiveContainer>
	);
};

export default AreaChartComponent;
