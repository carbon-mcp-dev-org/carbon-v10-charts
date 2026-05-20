import React, {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react';
import {
	Checkbox,
	Form,
	InlineLoading,
	Modal,
	NumberInput,
	Select,
	SelectItem,
	TextInput
} from '@carbon/react';
import { css } from 'emotion';
import debounce from 'lodash/debounce';
import { saveBlob, getFullFileName } from '../../../../utils/file-tools';
import { ShareOptionsModals } from '../share-options-modal';
import { ModalContext, ModalActionType } from '../../../../context/modal-context';
import { useHistory } from 'react-router';
import { ChartsContext } from '../../../../context';
import { getChartPreview, RenderProps } from '../../../../utils/chart-tools';

const exportSettingForm = css`
	width: 23rem;
`;
const exportSettingFormGroup = css`
	width: 320px;
	display: flex;
	gap: 1rem;
`;
const previewContainer = css`
	background-color: #e0e0e0;
	width: 100%;
	height: 100%;
	margin-top: 3rem;
	margin-left: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const modalBody = css`
	display: flex;
	margin-top: 3rem;
`;
const selectInputWH = css`
	margin-bottom: 1.5rem;
	width: 150px;
`;
const selectInput = css`
	margin-bottom: 1.5rem;
	width: 320px;
`;
const loadingState = css`
	margin-top: 1rem;
`;

const chartImage = css`
	max-height: 100%;
	max-width: 100%;
	display: block;
	margin: 0;
`;

interface ExportSettings {
	width: number,
	height: number,
	unit: string,
	ratioLock: boolean,
	chartName: string,
	format: string,
	curRatio: number
}

export interface ExportImageProps {
	chart: any,
	displayedModal: ShareOptionsModals | null,
	setDisplayedModal: (displayedModal: ShareOptionsModals | null) => void
}

export const ExportImageModal = (props: ExportImageProps) => {
	const [modalState, dispatchModal] = useContext(ModalContext);
	const [chartState] = useContext(ChartsContext);
	const history = useHistory();
	const location = history.location.pathname;
	const pathSegments = location.split('/');

	const id = `${chartState.currentId || pathSegments[pathSegments.length - 1]}`;
	const chart = chartState.charts.find((chartItem: any) => chartItem.id === id);

	const [inputs, setInputs] = useState<ExportSettings>({
		width: 800,
		height: 400,
		unit: 'pixels',
		ratioLock: false,
		chartName: props.chart.title,
		format: 'image/png',
		curRatio: 0
	});
	const [previewUrl, setPreviewUrl] = useState(props.chart.preview);
	const [isPerformingAction, setIsPerformingAction] = useState(false);
	const [isUpdatingPreview, setIsUpdatingPreview] = useState(false);
	const previewContainerRef = useRef<HTMLDivElement>(null);
	const [imageContainerSize, setImageContainerSize] = useState({
		width: 800,
		height: 400
	});

	const handleResize = useCallback(() => {
		if (!previewContainerRef.current) {
			return;
		}

		setImageContainerSize({
			width: previewContainerRef.current.offsetWidth,
			height: previewContainerRef.current.offsetHeight
		});
	}, []);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [handleResize]);

	const getPreviewSize = useCallback((width: number, height: number) => {
		const { width: containerWidth, height: containerHeight } = imageContainerSize;

		if (!containerWidth || !containerHeight) {
			return {
				width,
				height
			};
		}

		const fitRatio = width <= height
			? containerHeight / height
			: containerWidth / width;

		return {
			width: width * fitRatio,
			height: height * fitRatio
		};
	}, [imageContainerSize]);

	const updatePreviewUrl = useCallback(async(currentInputs: ExportSettings) => {
		const previewSize = getPreviewSize(currentInputs.width, currentInputs.height);
		const renderProps: RenderProps = {
			id: props.chart.id,
			name: currentInputs.chartName,
			width: currentInputs.width,
			height: currentInputs.height,
			preview: {
				format: currentInputs.format,
				width: previewSize.width,
				height: previewSize.height
			}
		};

		setIsUpdatingPreview(true);

		try {
			const imageBlob = await getChartPreview(chart, renderProps);
			const reader = new FileReader();

			reader.onloadend = () => {
				const imageUrl: string = reader.result ? reader.result.toString() : '';
				setPreviewUrl(imageUrl);
				setIsUpdatingPreview(false);
			};

			reader.onerror = () => {
				setIsUpdatingPreview(false);
			};

			reader.readAsDataURL(imageBlob ? imageBlob : new Blob());
		} catch (error) {
			setIsUpdatingPreview(false);
		}
	}, [chart, getPreviewSize, props.chart.id]);

	const debouncedPreviewUpdate = useMemo(
		() => debounce((nextInputs: ExportSettings) => updatePreviewUrl(nextInputs), 400),
		[updatePreviewUrl]
	);

	useEffect(() => {
		debouncedPreviewUpdate(inputs);

		return () => {
			debouncedPreviewUpdate.cancel();
		};
	}, [debouncedPreviewUpdate, inputs]);

	const onSubmit = async() => {
		if (isPerformingAction) {
			return;
		}

		setIsPerformingAction(true);

		try {
			const renderProps: RenderProps = {
				id: props.chart.id,
				name: inputs.chartName,
				width: inputs.width,
				height: inputs.height,
				format: inputs.format
			};
			const imageBlob = await getChartPreview(chart, renderProps);

			const fileName = getFullFileName(inputs.chartName, inputs.format);
			saveBlob(imageBlob, fileName);
			dispatchModal({ type: ModalActionType.closeModal });
		} finally {
			setIsPerformingAction(false);
		}
	};

	const handleChange = useCallback((updatedInputs: ExportSettings) => {
		setInputs(updatedInputs);
	}, []);

	return (
		<Modal
			open={modalState.ShowModal && props.displayedModal === ShareOptionsModals.IMAGE_EXPORTS}
			onRequestSubmit={onSubmit}
			onSecondarySubmit={() => { props.setDisplayedModal(ShareOptionsModals.SHARE_OPTIONS); }}
			onRequestClose={() => dispatchModal({ type: ModalActionType.closeModal })}
			primaryButtonText='Export'
			secondaryButtonText='Back to export options'
			modalHeading={`Export '${props.chart.title}' as image`}>
			<p>
				Export a static image of this chart for use in presentation decks or designs.
			</p>
			<div className={modalBody}>
				<ExportModalSettings inputs={inputs} onChange={handleChange} />
				<div className={previewContainer} ref={previewContainerRef}>
					<img
						id='previewimg'
						className={chartImage}
						src={previewUrl}
						alt={`Chart preview: ${props.chart.title}`} />
				</div>
			</div>
			{(isUpdatingPreview || isPerformingAction) && (
				<div className={loadingState}>
					<InlineLoading
						description={isPerformingAction ? 'Exporting image' : 'Updating preview'}
						status='active'
					/>
				</div>
			)}
		</Modal>
	);
};

interface ExportModalSettingsProps {
	inputs: ExportSettings,
	onChange: (inputs: ExportSettings) => void
}

const ExportModalSettings = ({ inputs, onChange }: ExportModalSettingsProps) => {
	const getRatio = () => Number((inputs.width / inputs.height).toFixed(2));

	const updateField = (id: keyof ExportSettings, value: string | number | boolean) => {
		onChange({
			...inputs,
			[id]: value
		});
	};

	const onDimensionChange = (id: 'width' | 'height', value: number) => {
		const safeValue = Number.isNaN(value) || value === 0 ? 1 : value;

		if (!inputs.ratioLock) {
			updateField(id, safeValue);
			return;
		}

		const currentRatio = inputs.curRatio === 0 ? getRatio() : inputs.curRatio;
		const nextInputs: ExportSettings = {
			...inputs,
			curRatio: currentRatio,
			[id]: safeValue
		};

		if (id === 'width') {
			nextInputs.height = Number((safeValue / currentRatio).toFixed(0));
		} else {
			nextInputs.width = Number((safeValue * currentRatio).toFixed(0));
		}

		onChange(nextInputs);
	};

	return (
		<Form className={exportSettingForm}>
			<TextInput
				className={selectInput}
				id='chartName'
				labelText='Name'
				placeholder='Chart name'
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					updateField('chartName', event.target.value);
				}}
				type='text'
				value={inputs.chartName} />
			<div className={exportSettingFormGroup}>
				<NumberInput
					className={selectInputWH}
					id='width'
					label='Width'
					value={inputs.width}
					min={1}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						onDimensionChange('width', parseFloat(event.target.value));
					}} />
				<NumberInput
					className={selectInputWH}
					id='height'
					label='Height'
					value={inputs.height}
					min={1}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						onDimensionChange('height', parseFloat(event.target.value));
					}} />
			</div>
			<Checkbox
				className={selectInput}
				id='ratioLock'
				labelText='Preserve aspect ratio'
				checked={inputs.ratioLock}
				onChange={(_: any, { checked }: { checked: boolean }) => {
					updateField('ratioLock', checked);
				}} />
			<Select
				className={selectInput}
				value={inputs.unit}
				id='unit'
				onChange={(event: React.ChangeEvent<HTMLSelectElement>) => updateField('unit', event.target.value)}
				labelText='Units'>
				<SelectItem text='pixels' value='pixels' />
			</Select>
			<Select
				className={selectInput}
				value={inputs.format}
				id='format'
				onChange={(event: React.ChangeEvent<HTMLSelectElement>) => updateField('format', event.target.value)}
				labelText='Format'>
				<SelectItem text='png' value='image/png' />
				<SelectItem text='jpeg' value='image/jpeg' />
				<SelectItem text='bmp' value='image/bmp' />
				<SelectItem text='gif' value='image/gif' />
			</Select>
		</Form>
	);
};