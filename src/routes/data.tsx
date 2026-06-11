import React from 'react';
import {
	Col, Main, Row
} from '../components';
import { Link } from 'react-router-dom';

import { Add } from '@carbon/icons-react';
import { Button } from '@carbon/react';

export const Data = () => (
	<Main>
		<Row>
			<Col cols={{ sm: 1 }}>
				<Link to="/data/add">
					<Button renderIcon={Add}>
						Add a dataset
					</Button>
				</Link>
			</Col>
		</Row>
	</Main>
);
