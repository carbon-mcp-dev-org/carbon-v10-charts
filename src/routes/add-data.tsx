import React, { useState } from 'react';
import { css } from 'emotion';
import {
	Button,
	CodeSnippet,
	Column,
	ContentSwitcher,
	Form,
	Grid,
	Link,
	Stack,
	Switch,
	TextInput
} from '@carbon/react';

import { Main } from './../components';
import { marginTop } from './../styles';

const placeholder = css`
	height: 100px;
	background: #f3f3f3;
	padding: 1rem;
`;

const sectionLabel = css`
	margin-bottom: 0.5rem;
`;

const pageTitle = css`
	margin-bottom: 2rem;
`;

const switcherWrapper = css`
	margin-bottom: 1rem;
`;

const switchDataType = (name: string) => {
	if (name === 'upload') {
		return (
			<Stack gap={7}>
				<TextInput id="createTitle" labelText="Title" placeholder="My awesome dataset" />

				<div>
					<p className={sectionLabel}>Files</p>
					<div className={placeholder}>
						uploader
					</div>
				</div>

				<div>
					<p className={sectionLabel}>Mapping</p>
					<div className={placeholder}>
						mapping of cols/rows to fields
					</div>
				</div>
			</Stack>
		);
	}

	if (name === 'api') {
		return (
			<Stack gap={7}>
				<TextInput id="createTitle" labelText="Title" placeholder="My awesome dataset" />

				<div>
					<p className={sectionLabel}>Endpoint</p>
					<CodeSnippet type="single">https://carbon-charts-builder.ibm.com/api/upload/eGVub24gaXMgYXdlc29tZQ==</CodeSnippet>
				</div>

				<div>
					<p className={sectionLabel}>Get started</p>
					<div className={placeholder}>
						how to use endpoint
					</div>
				</div>

				<div>
					<p className={sectionLabel}>Mapping</p>
					<div className={placeholder}>
						declaration of availiable fields
					</div>
				</div>
			</Stack>
		);
	}
	return null;
};

export const AddData = () => {
	const [type, setType] = useState('upload');

	return (
		<Main>
			<Grid>
				<Column sm={4} md={8} lg={16}>
					<h1 className={pageTitle}>New dataset</h1>
				</Column>
				<Column sm={4} md={8} lg={8}>
					<div className={switcherWrapper}>
						<ContentSwitcher onChange={(event: { name: string }) => setType(event.name)}>
							<Switch name="upload" text="Upload" />
							<Switch name="api" text="Endpoint" />
						</ContentSwitcher>
					</div>
					<Form className={marginTop()}>
						{switchDataType(type)}
						<Stack orientation="horizontal" gap={5} className={marginTop()}>
							<Link href="/data">Cancel</Link>
							<Button type="submit">Save</Button>
						</Stack>
					</Form>
				</Column>
			</Grid>
		</Main>
	);
};
