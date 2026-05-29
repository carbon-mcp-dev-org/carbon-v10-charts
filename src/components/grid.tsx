import React, { PropsWithChildren } from 'react';
import { Column, Grid } from '@carbon/react';

export type RowProps = PropsWithChildren<{
	styles?: any
}>;

export const Row = ({ styles, children }: RowProps) => (
	<Grid className={styles}>{children}</Grid>
);

export interface ColDefinition {
	sm?: number;
	md?: number;
	lg?: number;
}

export type ColProps = PropsWithChildren<{
	cols?: ColDefinition,
	render?: (props: PropsWithChildren<any>) => JSX.Element
}>;

export const Col = ({ cols, render, children }: ColProps) => {
	const baseRender = render ?? ((props) => <div {...props} />);
	return baseRender({
		children: (
			<Column sm={cols?.sm} md={cols?.md} lg={cols?.lg}>
				{children}
			</Column>
		)
	});
};
