import React, { useContext } from 'react';
import { Modal } from '@carbon/react';
import { useHistory, useLocation } from 'react-router-dom';
import { NotificationActionType, NotificationContext } from '../../context/notification-context';
import { ModalActionType, ModalContext } from '../../context/modal-context';
import {
	ChartActionType,
	ChartsContext,
	useFetchOne
} from '../../context/charts-context';

const getUniqueName = (charts: Array<any>, name: string) => {
	const nameRegEx = new RegExp(String.raw`(.*)\s+(copy)*(\s+(\d+))?$`);
	const nameMatch = name.match(nameRegEx);
	let count = 0;

	let nameBase = name;
	if (nameMatch) {
		nameBase = name.replace(nameRegEx, '$1');
		count = Number.parseInt(name.replace(nameRegEx, '$4'), 10);
		if (!count) {
			count = 0;
		}
	}

	const names: string[] = [];
	charts.forEach((chart) => {
		if (chart.title.includes(nameBase)) {
			names.push(chart.title);
		}
	});

	if (names.length <= 1) {
		return `${nameBase} copy`;
	}

	const highestNumber = names
		.map((currentName) => Number.parseInt(currentName.replace(nameRegEx, '$4'), 10))
		.filter((number) => !isNaN(number))
		.sort((a, b) => b - a)
		.shift();

	return `${nameBase} copy ${highestNumber && count < highestNumber ? highestNumber + 1 : count + 1}`;
};

export const DuplicateChartModal = ({ id }: any) => {
	const [modalState, dispatchModal] = useContext(ModalContext);
	const [, dispatchNotification] = useContext(NotificationContext);
	const [chartsState, dispatch] = useContext(ChartsContext);

	useFetchOne(id, dispatch);

	const history = useHistory();
	const location = useLocation();
	const chart = chartsState.charts.find((currentChart: any) => currentChart.id === id);

	const closeModal = () => {
		dispatchModal({ type: ModalActionType.closeModal });
	};

	const duplicateChart = () => {
		if (chartsState.currentlyProcessing) {
			return;
		}

		const chartCopy = JSON.parse(JSON.stringify(chart));
		chartCopy.title = getUniqueName(chartsState.charts, chartCopy.title);
		chartCopy.id = `${Math.random().toString().slice(2)}${Math.random().toString().slice(2)}`;

		dispatch({
			type: ChartActionType.ADD_ONE,
			data: chartCopy,
			loaded: true
		});

		if (location.pathname !== '/') {
			history.push(`/edit/${chartCopy.id}`);
		}

		dispatchNotification({
			type: NotificationActionType.ADD_NOTIFICATION,
			data: {
				kind: 'success',
				title: 'Duplication success',
				message: `'${chartCopy.title}  has been duplicated from '${chart.title}'.`
			}
		});

		closeModal();
	};

	return (
		<Modal
			size='sm'
			open={modalState.ShowModal}
			onRequestClose={closeModal}
			secondaryButtonText='Cancel'
			modalHeading='Duplicate chart?'
			primaryButtonText='Duplicate'
			primaryButtonDisabled={!!chartsState.currentlyProcessing}
			onRequestSubmit={duplicateChart}>
			<div>
				Click <strong>Duplicate</strong> to begin to edit a copy of the current chart
				or <strong>Cancel</strong> to continue on this chart.
			</div>
		</Modal>
	);
};
