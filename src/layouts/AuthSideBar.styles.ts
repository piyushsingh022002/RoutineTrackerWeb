import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { device } from '../styles/breakpoints';
import recotrackLogo from '../../Logos/recotrack.logo.png';

export const Sidebar = styled.aside`
	width: 45%;
	max-width: 580px;
	min-width: 320px;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	padding: 2rem 2rem;
	gap: 0.5rem;
	background: linear-gradient(165deg, rgba(17,24,39,0.06) 0%, rgba(79,70,229,0.05) 40%, rgba(17,24,39,0.04) 100%);
	color: var(--text-color);
	box-shadow: var(--shadow);
	overflow-y: auto;
	overflow-x: hidden;
	position: relative;
	&::-webkit-scrollbar {
		width: 6px;
	}

	&::-webkit-scrollbar-track {
		background: rgba(0, 0, 0, 0.05);
	}

	&::-webkit-scrollbar-thumb {
		background: rgba(79,70,229,0.3);
		border-radius: 3px;
	}

	&::-webkit-scrollbar-thumb:hover {
		background: rgba(79,70,229,0.5);
	}


	&::before {
		content: '';
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
			z-index: 10;
	}

	@media ${device.tablet} {
		display: none;
	}
`;

export const Brand = styled(Link)`
	display: inline-flex;
	align-items: center;
	gap: 0.55rem;
	padding: 0.65rem 1.05rem;
	border-radius: 999px;
	background: rgba(255, 255, 255, 0.82);
	border: 1px solid rgba(15, 23, 42, 0.06);
	box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
	font-family: 'Inter', 'Poppins', 'Segoe UI', system-ui, -apple-system, sans-serif;
	font-weight: 800;
	font-size: 1.05rem;
	letter-spacing: 0.01em;
	text-decoration: none;
	color: #0f172a;
	position: sticky;
	top: 1rem;
	z-index: 5;

	&::before {
		content: '';
		display: inline-block;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
		box-shadow: 0 0 0 6px rgba(79, 70, 229, 0.12);
	}

	&:hover {
		transform: translateY(-1px);
		box-shadow: 0 14px 32px rgba(15, 23, 42, 0.12);
	}
`;

export const Illustration = styled.img.attrs({
	src: recotrackLogo,
	alt: 'Recotrack logo',
})`
	display: block;
	width: auto;
	height: auto;
	max-width: 100%;
	border-radius: 24px;
	box-shadow: var(--shadow-md);
	margin: 1rem 0 0.5rem 0;
`;

export const Title = styled.h2`
	margin: 0.5rem 0 0.5rem 0;
	font-size: 1.75rem;
	font-weight: 700;
	color: var(--text-color);
	text-align: center;
	line-height: 1.3;
	letter-spacing: -0.02em;
	background: linear-gradient(135deg, #111827 0%, #312e81 70%, #4f46e5 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
`;

export const Subtitle = styled.p`
	margin: 0 0 0.5rem 0;
	color: var(--text-light);
	text-align: center;
	max-width: 380px;
	line-height: 1.6;
	font-size: 0.9375rem;
`;

export const Nav = styled.nav`
	display: flex;
	gap: 0.75rem;
	margin-top: 1.25rem;
`;

export const NavLink = styled(Link)<{ outline?: boolean }>`
	padding: 0.625rem 1.5rem;
	border-radius: 0.5rem;
	font-weight: 700;
	font-size: 0.95rem;
	letter-spacing: 0.01em;
	font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-width: 140px;
	text-decoration: none;
	transition: all 0.2s ease;

	${(p) =>
		p.outline
			? css`
				background: transparent;
				color: #111827;
				border: 2px solid rgba(55,65,81,0.18);
				box-shadow: 0 4px 12px rgba(17, 24, 39, 0.05);
				&:hover {
					background: rgba(55,65,81,0.07);
					border-color: rgba(55,65,81,0.28);
					transform: translateY(-2px);
					box-shadow: 0 8px 18px rgba(17, 24, 39, 0.12);
				}
				`
			: css`
				background: linear-gradient(120deg, var(--primary-color) 0%, #5145cd 100%);
				color: #fff;
				border: 2px solid transparent;
				box-shadow: 0 6px 18px rgba(17,24,39,0.16);
				&:hover {
					background: linear-gradient(120deg, #5145cd 0%, var(--primary-hover) 100%);
					transform: translateY(-2px);
					box-shadow: 0 10px 24px rgba(17,24,39,0.22);
				}
				`}
`;

export const StatsSection = styled.div`
	display: flex;
	gap: 1.5rem;
	margin: 1rem 0 0.75rem;
	padding: 1rem;
	background: rgba(255, 255, 255, 0.68);
	border-radius: 12px;
	backdrop-filter: blur(10px);
	border: 1px solid rgba(15,23,42,0.08);
`;

export const Stat = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.25rem;
`;

export const StatNumber = styled.span`
	font-size: 1.5rem;
	font-weight: 700;
	color: #1f2937;
	line-height: 1;
`;

export const StatLabel = styled.span`
	font-size: 0.75rem;
	color: rgba(55,65,81,0.75);
	font-weight: 500;
	text-align: center;
`;

export const FeaturesSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.625rem;
	margin: 0.75rem 0;
	width: 100%;
	max-width: 360px;
`;

export const Feature = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	padding: 0.75rem 1rem;
	background: rgba(248, 250, 252, 0.9);
	border-radius: 10px;
	border: 1px solid rgba(15,23,42,0.06);
	transition: all 0.2s ease;

	&:hover {
		background: rgba(255, 255, 255, 0.95);
		border-color: rgba(15,23,42,0.12);
		transform: translateX(4px);
	}
`;

export const FeatureIcon = styled.span`
	font-size: 1.4rem;
	line-height: 1;
`;

export const FeatureText = styled.span`
	font-size: 0.9375rem;
	font-weight: 600;
	color: var(--text-color);
`;

export const Testimonial = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	padding: 1rem 1.25rem;
	background: linear-gradient(135deg, rgba(17,24,39,0.08), rgba(79,70,229,0.06));
	border-radius: 12px;
	border-left: 3px solid var(--primary-color);
	margin: 0.75rem 0;
	max-width: 360px;
`;

export const TestimonialText = styled.p`
	margin: 0;
	font-size: 0.9375rem;
	font-style: italic;
	color: #1f2937;
	line-height: 1.5;
`;

export const TestimonialAuthor = styled.span`
	font-size: 0.8125rem;
	font-weight: 700;
	color: #111827;
`;

export const TrustBadges = styled.div`
	display: flex;
	gap: 0.5rem;
	margin-top: 0.75rem;
	margin-bottom: 1rem;
	flex-wrap: wrap;
	justify-content: center;
`;

export const Badge = styled.span`
	font-size: 0.75rem;
	padding: 0.375rem 0.75rem;
	background: rgba(55, 65, 81, 0.08);
	color: #1f2937;
	border-radius: 18px;
	font-weight: 600;
	border: 1px solid rgba(17, 24, 39, 0.08);
`;

 