import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { device } from '../styles/breakpoints';

export const Sidebar = styled.aside`
	width: 42%;
	max-width: 520px;
	min-width: 300px;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 3.5rem 2.5rem;
	gap: 1.25rem;
	background: linear-gradient(180deg, rgba(79,70,229,0.06), rgba(99,102,241,0.02));
	color: var(--text-color);
	box-shadow: var(--shadow);
    // border-radius: 0 300px 160px 0;

	@media ${device.tablet} {
		display: none;
	}
`;

export const Brand = styled(Link)`
	font-weight: 700;
	font-size: 1.25rem;
	color: var(--primary-color);
	text-decoration: none;
	margin-bottom: 0.75rem;
`;

export const Illustration = styled.div`
	width: 220px;
	height: 220px;
	border-radius: 24px;
	background: radial-gradient(120px 80px at 20% 20%, rgba(79,70,229,0.14), transparent 30%),
		linear-gradient(135deg, rgba(99,102,241,0.12), rgba(59,130,246,0.06));
	box-shadow: var(--shadow-md);
	margin: 1rem 0 0.5rem 0;
`;

export const Title = styled.h2`
	margin: 0.75rem 0 0.25rem 0;
	font-size: 1.5rem;
	color: var(--text-color);
	text-align: center;
`;

export const Subtitle = styled.p`
	margin: 0;
	color: var(--text-light);
	text-align: center;
	max-width: 320px;
	line-height: 1.4;
`;

export const Nav = styled.nav`
	display: flex;
	gap: 0.75rem;
	margin-top: 1.25rem;
`;

export const NavLink = styled(Link)<{ outline?: boolean }>`
	padding: 0.5rem 1rem;
	border-radius: 0.375rem;
	font-weight: 600;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-width: 120px;
	text-decoration: none;

	${(p) =>
		p.outline
			? css`
					background: transparent;
					color: var(--primary-color);
					border: 1px solid rgba(79,70,229,0.14);
					&:hover {
						background: rgba(79,70,229,0.04);
					}
				`
			: css`
					background: var(--primary-color);
					color: #fff;
					border: 1px solid transparent;
					&:hover {
						background: var(--primary-hover);
					}
				`}
`;

 