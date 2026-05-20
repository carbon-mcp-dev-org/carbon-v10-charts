import React, { useContext } from 'react';

import { ShareOptionsModals } from '../share-options-modal';

import { createChartSandbox } from './create-chart-sandbox';
import { createReactChartApp } from './frameworks/react-chart';
import { createAngularChartApp } from './frameworks/angular-chart';
import { createVanillaChartApp } from './frameworks/vanilla-chart';
import { createVueChartApp } from './frameworks/vue-chart';

import {
	CodeSnippet,
	Modal,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs
} from '@carbon/react';
import { ModalContext, ModalActionType } from '../../../../context/modal-context';
import { css } from 'emotion';

const codeSnippetWrapper = css`
    margin-top: 20px;
    p {
        margin-bottom: 7px;
    }
`;

const titleWrapper = css`
    display: flex;
    margin-top: 30px;
    a {
        margin-left: auto;
    }
`;

const codeSnippet = css`
    button {
        background: white;
    }
`;

interface ExportCodeProps {
    chart: any,
    displayedModal: ShareOptionsModals | null,
    setDisplayedModal: (displayedModal: ShareOptionsModals | null) => void
}

const renderCodeSection = (title: string, code: Record<string, any>) => (
	<>
		<div className={titleWrapper}>
			<h3>{title}</h3>
			<a
				href={`https://codesandbox.io/api/v1/sandboxes/define?parameters=${createChartSandbox(code)}`}
				target='_blank'
				rel='noopener noreferrer'>
				Edit on CodeSandbox
			</a>
		</div>
		{
			Object.keys(code).map((fileName: string) => (
				<div className={codeSnippetWrapper} key={fileName}>
					<p>{fileName}</p>
					<CodeSnippet
						type='multi'
						className={codeSnippet}
						copyButtonDescription={`Copy ${fileName} to clipboard`}>
						{
							fileName !== 'package.json'
								? code[fileName]
								: JSON.stringify(code[fileName], null, '\t')
						}
					</CodeSnippet>
				</div>
			))
		}
	</>
);

export const ExportCode = ({
	chart,
	displayedModal,
	setDisplayedModal
}: ExportCodeProps) => {
	const [modalState, dispatchModal] = useContext(ModalContext);

	const vanillaCode: Record<string, any> = createVanillaChartApp(chart);
	const reactCode: Record<string, any> = createReactChartApp(chart);
	const angularCode: Record<string, any> = createAngularChartApp(chart);
	const vueCode: Record<string, any> = createVueChartApp(chart);

	return (
		<Modal
			open={modalState.ShowModal && displayedModal === ShareOptionsModals.CODE_EXPORTS}
			onRequestClose={() => dispatchModal({ type: ModalActionType.closeModal })}
			primaryButtonText='Done'
			secondaryButtonText='Back to export options'
			onRequestSubmit={() => dispatchModal({ type: ModalActionType.closeModal })}
			onSecondarySubmit={() => { setDisplayedModal(ShareOptionsModals.SHARE_OPTIONS); }}
			size='lg'
			modalHeading={`Export "${chart.title}" code`}>
			<Tabs>
				<TabList aria-label='Framework code export options'>
					<Tab>Vanilla JS</Tab>
					<Tab>Angular</Tab>
					<Tab>React</Tab>
					<Tab>Vue</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						{renderCodeSection('Vanilla JS Code', vanillaCode)}
					</TabPanel>
					<TabPanel>
						{renderCodeSection('Angular Code', angularCode)}
					</TabPanel>
					<TabPanel>
						{renderCodeSection('React Code', reactCode)}
					</TabPanel>
					<TabPanel>
						{renderCodeSection('Vue Code', vueCode)}
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Modal>
	);
};