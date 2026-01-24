import { motion } from 'framer-motion';
import styled from 'styled-components';
import { device } from '../styles/breakpoints';

export const NewPasswordContainer = styled.div`
	min-height: 100vh;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1.5rem 0.75rem;
	background: radial-gradient(circle at 20% 20%, rgba(79,70,229,0.06), transparent 35%),
		radial-gradient(circle at 80% 0%, rgba(17,24,39,0.05), transparent 40%),
		rgba(248, 250, 252, 1);
	box-sizing: border-box;
	@media ${device.tablet} {
		padding: 2rem 1rem;
	}
	@media ${device.laptop} {
		padding: 3rem 2rem;
	}
`;

export const NewPasswordCard = styled(motion.div)`
	width: 100%;
	max-width: 460px;
	justify-content: center;
	display: flex;
	align-items: center;
	flex-direction: column;
	background-color: #fffffffa;
	border: 1px solid rgba(15, 23, 42, 0.08);
	border-radius: 16px;
	box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
	backdrop-filter: blur(4px);
	padding: 1.75rem;
	@media ${device.tablet} {
		padding: 2rem;
	}
	@media ${device.mobile} {
		padding: 1.25rem;
	}
`;

export const Logo = styled.div`
	font-size: 1.65rem;
	font-weight: 800;
	text-align: center;
	margin-bottom: 1rem;
	background: linear-gradient(120deg, #111827 0%, #4338ca 45%, #7c3aed 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
`;

export const Title = styled.h1`
	font-size: 1.35rem;
	font-weight: 700;
	color: #0f172a;
	text-align: center;
	margin-bottom: 0.5rem;
	letter-spacing: -0.01em;
`;

export const Subtitle = styled.p`
	font-size: 0.95rem;
	color: #475569;
	text-align: center;
	margin-bottom: 1.5rem;
	line-height: 1.5;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1.25rem;
	width: 100%;
`;

export const FormGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
`;

export const Label = styled.label`
	font-size: 0.9rem;
	font-weight: 600;
	color: #1f2937;
`;

export const Input = styled.input`
	padding: 0.8rem 0.9rem;
	border: 1px solid #e2e8f0;
	border-radius: 12px;
	font-size: 0.95rem;
	transition: var(--transition);
	background: #f8fafc;
	color: #0f172a;

	&:focus {
		outline: none;
		border-color: #4f46e5;
		box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.18);
		background: #ffffff;
	}

	&:disabled {
		background: #e2e8f0;
		color: #64748b;
		cursor: not-allowed;
	}

	&::placeholder {
		color: #94a3b8;
	}
`;

export const SuccessCodeInput = styled(Input)`
	background: linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(34, 197, 94, 0.06));
	border-color: #10b981;
	font-weight: 700;
	letter-spacing: 0.15em;
	text-align: center;
	font-size: 1.1rem;

	&:focus {
		border-color: #059669;
		box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
		background: rgba(16, 185, 129, 0.1);
	}
`;

export const PasswordStrengthBar = styled.div<{ strength: number }>`
	width: 100%;
	height: 6px;
	background: #e2e8f0;
	border-radius: 3px;
	overflow: hidden;
	margin-top: 0.25rem;

	&::after {
		content: '';
		display: block;
		height: 100%;
		width: ${(props) => props.strength * 25}%;
		background: ${(props) =>
			props.strength === 1
				? '#ef4444'
				: props.strength === 2
				? '#f59e0b'
				: props.strength === 3
				? '#3b82f6'
				: props.strength === 4
				? '#10b981'
				: '#e2e8f0'};
		transition: width 0.3s ease, background 0.3s ease;
	}
`;

export const PasswordStrengthText = styled.span<{ strength: number }>`
	font-size: 0.8rem;
	font-weight: 600;
	margin-top: 0.35rem;
	display: inline-block;
	color: ${(props) =>
		props.strength === 1
			? '#ef4444'
			: props.strength === 2
			? '#f59e0b'
			: props.strength === 3
			? '#3b82f6'
			: props.strength === 4
			? '#10b981'
			: '#64748b'};
`;

export const ErrorMessage = styled.div`
	color: #ef4444;
	font-size: 0.8rem;
	margin-top: 0.25rem;
	font-weight: 500;
`;

export const SuccessMessage = styled.div`
	padding: 0.75rem 1rem;
	background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(34, 197, 94, 0.08));
	border-left: 3px solid #10b981;
	border-radius: 8px;
	color: #065f46;
	font-size: 0.9rem;
	font-weight: 600;
	margin-bottom: 0.5rem;
	display: flex;
	align-items: center;
	gap: 0.5rem;

	&::before {
		content: '✓';
		font-size: 1.2rem;
		font-weight: 700;
	}
`;

export const UpdateButton = styled(motion.button)`
	padding: 0.9rem;
	background: linear-gradient(120deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%);
	color: #fef2f2;
	border: none;
	border-radius: 14px;
	font-weight: 700;
	font-size: 1rem;
	letter-spacing: 0.01em;
	cursor: pointer;
	transition: all 0.2s ease;
	box-shadow: 0 12px 30px rgba(239, 68, 68, 0.25);
	margin-top: 0.5rem;

	&:hover {
		transform: translateY(-1px);
		box-shadow: 0 14px 36px rgba(220, 38, 38, 0.35);
	}

	&:disabled {
		background-color: #cbd5e0;
		cursor: not-allowed;
		box-shadow: none;
		transform: none;
	}
`;

export const BackLink = styled.a`
	text-align: center;
	font-size: 0.9rem;
	color: #4338ca;
	font-weight: 700;
	text-decoration: none;
	margin-top: 1rem;
	padding: 0.35rem;
	border-radius: 8px;
	transition: color 0.2s ease, background-color 0.2s ease;

	&:hover {
		color: #312e81;
		background: rgba(67, 56, 202, 0.08);
	}
`;

export const TopRightAction = styled.div`
	position: fixed;
	top: 1rem;
	right: 1rem;
	z-index: 1000;
`;
