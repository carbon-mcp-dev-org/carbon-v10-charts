import React from 'react';
import { css } from 'emotion';
import { Button, Column, Content, Grid } from '@carbon/react';
import { useHistory } from 'react-router-dom';
import { Header } from '../components/header';
import placeholder from '../assets/chart-404.svg';

const svgStyle = css`
	width: 25vw;
	height: auto;
	max-width: 400px;
`;

const placeholderContainer = css`
	display: flex;
	flex-direction: column;
	min-height: calc(100vh - 3rem);
	padding: 2rem 1.5rem;
	align-items: center;
`;

const messageWrapper = css`
	text-align: left;
`;

const description = css`
	margin-top: 0.5rem;
`;

const action = css`
	margin-top: 1rem;
`;

export const NotFound = () => {
	const history = useHistory();

	return (
		<>
			<Header />
			<Content>
				<Grid>
					<Column sm={4} md={8} lg={16}>
						<div className={placeholderContainer}>
							<img alt="Chart not found" src={placeholder} className={svgStyle} />
							<div className={messageWrapper}>
								<h3>404: Not found</h3>
								<p className={description}>
									This page does not exist, click <strong>Go back</strong>
									<br />
									to return.
								</p>
								<Button className={action} onClick={() => history.goBack()}>
									Go back
								</Button>
							</div>
						</div>
					</Column>
				</Grid>
			</Content>
		</>
	);
};
