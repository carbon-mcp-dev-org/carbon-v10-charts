import { css } from 'emotion';

export const main = css`
	background: #f4f4f4;
	min-height: 100vh;
	max-width: unset;
`;

export const marginTop = (margin = '1rem') => css`margin-top: ${margin};`;