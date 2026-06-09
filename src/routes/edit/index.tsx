import React, { useContext, useEffect } from 'react';
import { css } from 'emotion';
import { Content } from '@carbon/react';
import { EditHeader } from './edit-header';
import { DataTable } from './data-table/data-table';
import { ChartActionType, ChartsContext, useFetchOne } from '../../context/charts-context';
import { EditChart } from '../../components/edit-chart';

const editPageContent = css`
	width: 100%;
	min-height: 100%;
	max-width: 100%;
	background: #f4f4f4;
	padding: 1rem 2rem;
`;

export const Edit = ({ match }: any) => {
	const [state, dispatch] = useContext(ChartsContext);
	useFetchOne(match.params.id, dispatch);
	const chart = state.charts.find((currentChart: any) => currentChart.id === match.params.id);

	const setChart = (updatedChart: any) => {
		dispatch({
			type: ChartActionType.UPDATE_ONE,
			data: updatedChart
		});
	};

	useEffect(() => {
		window.scrollTo({ top: 0 });

		if (chart && chart.title) {
			document.title = `Edit "${chart.title}"`;
		} else {
			document.title = 'Edit chart';
		}
	}, [chart]);

	return (
		<Content
			id='edit-content'
			className={editPageContent}>
			{chart && <EditHeader chart={chart} />}
			<div>
				{chart && (
					<>
						<EditChart chart={chart} setChart={setChart} />
						{chart.data && <DataTable chart={chart} />}
					</>
				)}
			</div>
		</Content>
	);
};
