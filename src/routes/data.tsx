import React from 'react';
import { Add } from '@carbon/icons-react';
import { Button, Column, Grid } from '@carbon/react';
import { useHistory } from 'react-router-dom';

import { Main } from '../components';

export const Data = () => {
	const history = useHistory();

	return (
		<Main>
			<Grid>
				<Column sm={4} md={8} lg={16}>
					<Button renderIcon={Add} iconDescription="Add a dataset" onClick={() => history.push('/data/add')}>
						Add a dataset
					</Button>
				</Column>
			</Grid>
		</Main>
	);
};
