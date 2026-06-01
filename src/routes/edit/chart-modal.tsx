import React, { useContext } from 'react';
import { ModalType, ModalContext } from '../../context/modal-context';
import { ShareOptionsModal } from './share-options/share-options-modal';
import { DuplicateChartModal } from './duplicate-chart-modal';
import { DeleteChartModal } from './delete-chart-modal';
import { SettingsChartModal } from './settings-chart-modal';
import { ChartsContext, useFetchOne } from '../../context/charts-context';

export const ChartModal = ({ chart }: any) => {
	const [, dispatch] = useContext(ChartsContext);

	useFetchOne(chart.id, dispatch);

	const [modalState] = useContext(ModalContext);

	switch (modalState.ModalType) {
		case ModalType.DUPLICATION:
			return <DuplicateChartModal id={chart.id} />;
		case ModalType.SHARING:
			return <ShareOptionsModal chart={chart} />;
		case ModalType.DELETION:
			return <DeleteChartModal id={chart.id} />;
		case ModalType.SETTINGS:
			return <SettingsChartModal chart={chart} />;
		default:
			return null;
	}
};
