
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { device } from '../styles/breakpoints';

export const LoginContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1.5rem 0.75rem;
	background: transparent;
	box-sizing: border-box;
	zoom: 1;
	transform: scale(1);
	transform-origin: top left;
	
	@media ${device.tablet} {
		padding: 2rem 1rem;
	}
	@media ${device.laptop} {
		padding: 3rem 2rem;
	}
`;

export const LoginCard = styled(motion.div)`
	width: 100%;
	max-width: 440px;
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
	zoom: 1;
	transform: scale(1);
	transform-origin: top center;
	
	.dark & {
		background-color: #1e293b;
		border: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
	}
	
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
	margin-bottom: 1.5rem;
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
	margin-bottom: 1.25rem;
	letter-spacing: -0.01em;
	
	.dark & {
		color: #f1f5f9;
	}
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
`;

export const FormGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
`;

export const Label = styled.label`
	font-size: 0.875rem;
	font-weight: 600;
	color: #1f2937;
	
	.dark & {
		color: #e2e8f0;
	}
`;

export const Input = styled.input`
	padding: 0.8rem 0.9rem;
	border: 1px solid #e2e8f0;
	border-radius: 12px;
	font-size: 0.95rem;
	transition: var(--transition);
	background: #f8fafc;
	color: #0f172a;

	.dark & {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(30, 41, 59, 0.5);
		color: #f1f5f9;
	}

	&:focus {
		outline: none;
		border-color: #4f46e5;
		box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.18);
		background: #ffffff;
	}
	
	.dark &:focus {
		background: rgba(30, 41, 59, 0.8);
		box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
	}
`;

export const ErrorMessage = styled.div`
	color: var(--danger-color);
	font-size: 0.75rem;
	margin-top: 0.25rem;
`;

export const SubmitButton = styled(motion.button)`
	padding: 0.85rem;
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

export const ForgotRow = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	margin-top: -0.35rem;
	margin-bottom: 0.2rem;
`;

export const ForgotLink = styled(Link)`
	font-size: 0.9rem;
	font-weight: 700;
	color: #4338ca;
	text-decoration: none;
	padding: 0.15rem 0.25rem;
	border-radius: 8px;
	transition: color 0.2s ease, background-color 0.2s ease, transform 0.15s ease;

	&:hover {
		color: #312e81;
		background: rgba(67, 56, 202, 0.08);
		transform: translateY(-1px);
	}
`;

export const SignUpText = styled.div`
	text-align: center;
	font-size: 0.9rem;
	margin-top: 1.5rem;
	color: #4b5563;
`;

export const SignUpLink = styled(Link)`
	color: #4f46e5;
	font-weight: 700;
	margin-left: 0.25rem;

	&:hover {
		text-decoration: underline;
	}
`;

export const TopRightAction = styled.div`
	position: fixed;
	top: 1rem;
	right: 1rem;
	z-index: 1000;
`;
