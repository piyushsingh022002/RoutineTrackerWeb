import { motion } from 'framer-motion';
import styled from 'styled-components';
import { device } from '../styles/breakpoints';

export const OtpVerificationContainer = styled.div`
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

export const OtpVerificationCard = styled(motion.div)`
	width: 100%;
	max-width: 480px;
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
	margin-bottom: 2rem;
	line-height: 1.5;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	width: 100%;
	align-items: center;
`;

export const OtpInputContainer = styled.div`
	display: flex;
	gap: 0.75rem;
	justify-content: center;
	width: 100%;
	flex-wrap: wrap;

	@media ${device.mobile} {
		gap: 0.5rem;
	}
`;

export const OtpInput = styled.input`
	width: 56px;
	height: 56px;
	border: 2px solid #e2e8f0;
	border-radius: 12px;
	font-size: 1.5rem;
	font-weight: 700;
	text-align: center;
	transition: all 0.2s ease;
	background: #f8fafc;
	color: #0f172a;
	caret-color: #4f46e5;

	&:focus {
		outline: none;
		border-color: #4f46e5;
		box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.18);
		background: #ffffff;
		transform: scale(1.05);
	}

	&:disabled {
		background: #e2e8f0;
		cursor: not-allowed;
	}

	/* Remove number input arrows */
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	&[type='number'] {
		-moz-appearance: textfield;
	}

	@media ${device.mobile} {
		width: 48px;
		height: 48px;
		font-size: 1.25rem;
	}
`;

export const ErrorMessage = styled.div`
	color: #ef4444;
	font-size: 0.9rem;
	margin-top: -0.5rem;
	font-weight: 600;
	text-align: center;
`;

export const VerifyButton = styled(motion.button)`
	padding: 0.9rem 2rem;
	background: linear-gradient(120deg, #4f46e5 0%, #4338ca 50%, #312e81 100%);
	color: #f8fafc;
	border: none;
	border-radius: 14px;
	font-weight: 700;
	font-size: 1rem;
	letter-spacing: 0.01em;
	cursor: pointer;
	transition: all 0.2s ease;
	box-shadow: 0 12px 30px rgba(79, 70, 229, 0.25);
	width: 100%;
	max-width: 280px;

	&:hover {
		transform: translateY(-1px);
		box-shadow: 0 14px 36px rgba(67, 56, 202, 0.3);
	}

	&:disabled {
		background-color: #cbd5e0;
		cursor: not-allowed;
		box-shadow: none;
		transform: none;
	}
`;

export const ResendSection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
	margin-top: 1rem;
`;

export const ResendText = styled.p`
	font-size: 0.9rem;
	color: #64748b;
	margin: 0;
`;

export const ResendButton = styled.button`
	background: transparent;
	border: none;
	color: #4338ca;
	font-weight: 700;
	font-size: 0.9rem;
	cursor: pointer;
	padding: 0.35rem 0.75rem;
	border-radius: 8px;
	transition: all 0.2s ease;

	&:hover {
		background: rgba(67, 56, 202, 0.08);
		color: #312e81;
	}

	&:disabled {
		color: #cbd5e0;
		cursor: not-allowed;
	}
`;

export const Timer = styled.span`
	color: #4f46e5;
	font-weight: 700;
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
