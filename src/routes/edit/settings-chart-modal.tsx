import React, { useContext, useState } from 'react';
import {
	Checkbox,
	Modal,
	TextInput,
	DefinitionTooltip
} from '@carbon/react';
import { ModalActionType, ModalContext } from '../../context/modal-context';
import { ChartActionType, ChartsContext } from '../../context/charts-context';
import './chart-modal.scss';

export const SettingsChartModal = ({ chart }: any) => {
	const [modalState, dispatchModal] = useContext(ModalContext);
	const [, dispatch] = useContext(ChartsContext);
	const [title, setTitle] = useState(chart.title);
	const [isTemplate, setIsTemplate] = useState(
		chart.labels && chart.labels.includes('template')
	);

	const closeModal = () => {
		dispatchModal({ type: ModalActionType.closeModal });
	};

	const updateChartSettings = () => {
		let labels = chart.labels || [];

		if (isTemplate) {
			if (!labels.includes('template')) {
				labels = [...labels, 'template'];
			}
		} else {
			labels = labels.filter((label: string) => label !== 'template');
		}

		dispatch({
			type: ChartActionType.UPDATE_ONE,
			data: {
				...chart,
				title,
				labels
			},
			loaded: true
		});

		closeModal();
	};

	return (
		<Modal
			size='sm'
			open={modalState.ShowModal}
			onRequestClose={closeModal}
			secondaryButtonText='Cancel'
			hasForm
			modalHeading='Edit chart settings'
			primaryButtonText='Save'
			onRequestSubmit={updateChartSettings}>
			<TextInput
				id='chartName'
				labelText='Chart name'
				value={title}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
			/>
			<div className='chart-modal__template-setting'>
				<Checkbox
					id='setChartAsTemplate'
					checked={isTemplate}
					labelText='Make this chart a template'
					onChange={(_, { checked }) => setIsTemplate(!!checked)}
				/>
				<DefinitionTooltip
					definition='Setting a chart as a template makes it an easy starting point for future charts.'
					align='bottom'>
					template
				</DefinitionTooltip>
			</div>
		</Modal>
	);
};
