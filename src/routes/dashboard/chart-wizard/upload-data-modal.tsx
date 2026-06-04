import React, { useState } from 'react';

import { css } from 'emotion';
import {
	Modal,
	FileUploader,
	FileUploaderItem
} from '@carbon/react';
import { ChartWizardModals } from './chart-wizard';
import { ChartType } from '../../../interfaces';
import { processDataFile } from '../../../utils/file-tools';
import { getGroupNames } from '../../../utils/chart-tools';

const fileUploaderModal = css`
	.cds--file-container {
		margin-top: 1rem;
	}
`;

const fileUploaderHeading = css`
	margin-top: 2rem;
`;

export interface UploadDataModalProps {
	shouldDisplay: boolean,
	setShouldDisplay: (shouldDisplay: boolean) => void,
	setUploadedData: (uploadedData: any) => void,
	setDisplayedModal: (displayedModal: ChartWizardModals | null) => void,
	setLastVisitedModal: (lastVisitedModal: ChartWizardModals) => void,
	setRecommendedCharts: (recommendedCharts: ChartType[]) => void
}

export const UploadDataModal = (props: UploadDataModalProps) => {
	const [uploadedFile, setUploadedFile] = useState<any>(null);
	const [fileErrorState, setFileErrorState] = useState({
		isFileInvalid: false,
		errorMessage: ''
	});

	const generateChartRecommendations = (chartData: any) => {
		const chartRecommendations: ChartType[] = [];

		const groupNames = getGroupNames(chartData);

		if (groupNames.length === 1) {
			chartRecommendations.push.apply(chartRecommendations, [
				ChartType.DONUT_CHART,
				ChartType.PIE_CHART
			]);
		} else if (groupNames.length > 1) {
			chartRecommendations.push.apply(chartRecommendations, [
				ChartType.SCATTER_CHART,
				ChartType.SIMPLE_BAR_CHART,
				ChartType.STACKED_BAR_CHART,
				ChartType.HORIZONTAL_BAR_CHART,
				ChartType.GROUPED_BAR_CHART,
				ChartType.LINE_CHART,
				ChartType.AREA_CHART,
				ChartType.STACKED_AREA_CHART
			]);
		}

		props.setRecommendedCharts(chartRecommendations);
	};

	const onFileAdded = (event: any) => {
		setFileErrorState({
			isFileInvalid: false,
			errorMessage: ''
		});

		const files = event?.target?.files || event?.addedFiles || [];
		const [fileUploaded] = Array.from(files);
		setUploadedFile(fileUploaded || null);
	};

	const onFileDelete = () => {
		setFileErrorState({
			isFileInvalid: false,
			errorMessage: ''
		});
		setUploadedFile(null);
	};

	const handleFileUpload = async() => {
		processDataFile(uploadedFile).then((uploadedData: any) => {
			props.setUploadedData(uploadedData);
			generateChartRecommendations(uploadedData.data);
		}).then(() => {
			props.setDisplayedModal(ChartWizardModals.CHOOSE_CHART_MODAL);
			props.setLastVisitedModal(ChartWizardModals.UPLOAD_DATA_MODAL);
		}).catch((err) => {
			setFileErrorState({
				isFileInvalid: true,
				errorMessage: err
			});
		});
	};

	return (
		<Modal
			className={fileUploaderModal}
			open={props.shouldDisplay}
			shouldSubmitOnEnter={false}
			onRequestSubmit={() => handleFileUpload()}
			primaryButtonDisabled={!uploadedFile}
			onRequestClose={() => { props.setShouldDisplay(false); }}
			onSecondarySubmit={() => {
				props.setDisplayedModal(ChartWizardModals.CREATE_CHART_MODAL);
				props.setLastVisitedModal(ChartWizardModals.UPLOAD_DATA_MODAL);
			}}
			modalHeading='Upload chart data'
			primaryButtonText='Done'
			secondaryButtonText='Back'>
			<p>
				Start with uploading the chart data or create a new chart from scratch.
			</p>
			<div className={fileUploaderHeading}>
				<FileUploader
					labelTitle='Upload data file'
					labelDescription='Only .json and .csv files'
					buttonLabel='Add file'
					buttonKind='primary'
					size='md'
					filenameStatus='edit'
					iconDescription='Delete file'
					multiple={false}
					accept={['.json', '.csv']}
					onChange={onFileAdded}
				/>
			</div>
			{
				uploadedFile
					? <FileUploaderItem
						status='edit'
						name={uploadedFile.name}
						invalid={fileErrorState.isFileInvalid}
						errorSubject={fileErrorState.errorMessage}
						iconDescription='Delete file'
						onDelete={() => {
							onFileDelete();
							props.setUploadedData({
								data: [],
								wasDataModified: false
							});
						}}/>
					: null
			}
		</Modal>
	);
};