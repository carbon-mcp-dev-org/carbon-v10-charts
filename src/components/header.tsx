import React from 'react';
import {
	Header as ShellHeader,
	HeaderMenuButton,
	HeaderName,
	SkipToContent
} from '@carbon/react';
import { css } from 'emotion';
import { useHistory } from 'react-router-dom';

export const Header = ({ isSideNavExpanded, setIsSideNavExpanded }: any) => {
	const history = useHistory();

	const headerName = css`
		&:hover {
			cursor: pointer;
		}
	`;

	return (
		<ShellHeader aria-label="IBM Carbon Charts Builder">
			<SkipToContent href="#main-content" />
			<HeaderMenuButton
				aria-label={`${isSideNavExpanded ? 'Close menu' : 'Open menu'}`}
				isActive={isSideNavExpanded}
				onClick={() => setIsSideNavExpanded(!isSideNavExpanded)} />
			<HeaderName
				prefix="IBM"
				tabIndex={0}
				title='Carbon Charts Builder home'
				className={headerName}
				onClick={() => history.push('/')}
				onKeyDown={(event: any) => event.key === 'Enter' && history.push('/')}>
				Carbon Charts Builder {process.env.NODE_ENV === 'development' ? 'Dev' : ''}
			</HeaderName>
		</ShellHeader>
	);
};
