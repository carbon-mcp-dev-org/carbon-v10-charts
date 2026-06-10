const chartTagMap: Record<string, string> = {
	'simple-bar-chart': 'SimpleBarChart',
	'grouped-bar-chart': 'GroupedBarChart',
	'stacked-bar-chart': 'StackedBarChart',
	'line-chart': 'LineChart',
	'area-chart': 'AreaChart',
	'stacked-area-chart': 'StackedAreaChart',
	'scatter-chart': 'ScatterChart',
	'pie-chart': 'PieChart',
	'donut-chart': 'DonutChart'
};

export const createReactChartApp = (chart: any) => {
	const chartData = JSON.stringify(chart.data, null, '\t');
	const chartType = `${chart.type}`;
	let chartOptions = '';
	let theme;
	if (chart && chart.options && chart.options.rawChartOptions) {
		// eslint-disable-next-line prefer-destructuring
		theme = chart.options.rawChartOptions.theme;
		chartOptions = JSON.stringify(chart.options.rawChartOptions, null, '\t');
	}

	let chartTheme = '@carbon/charts-react/styles.css';
	if (theme && theme !== 'default') {
		chartTheme = `@carbon/charts-react/styles-${theme}.css`;
	}

	const indexHtml = `<div id='root'></div>
`;
const indexJs
= `import React from 'react';
import { createRoot } from 'react-dom/client';
import { ${chartTagMap[chartType]} } from '@carbon/charts-react';
import '${chartTheme}';

const options =
	${chartOptions};

function App() {
	const data =
		${chartData};
	
	return (
		<div style={{ height: '500px', width: '100%' }}>
			<${chartTagMap[chartType]}
				data={data}
				options={options}>
			</${chartTagMap[chartType]}>
		</div>
	);
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
`;

	const packageJson = {
		dependencies: {
			'@carbon/charts': '^1.27.11',
			'@carbon/charts-react': '^1.27.11',
			'@carbon/react': '^1.109.0',
			'@carbon/colors': '^11.0.0',
			d3: '7.8.5',
			react: '18.2.0',
			'react-dom': '18.2.0',
			'react-scripts': '5.0.1'
		}
	};

	return {
		'src/index.html': indexHtml,
		'src/index.js': indexJs,
		'package.json': packageJson
	};
};
