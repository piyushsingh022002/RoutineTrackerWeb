import { motion } from 'framer-motion';
import styled from 'styled-components';
import { device } from '../styles/breakpoints';

export const OtpContainer = styled.div`
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
	
	.dark & {
		background: radial-gradient(circle at 20% 20%, rgba(99,102,241,0.15), transparent 35%),
			radial-gradient(circle at 80% 0%, rgba(79,70,229,0.12), transparent 40%),
			rgba(15, 23, 42, 1);
	}
	
	@media ${device.tablet} {
		padding: 2rem 1rem;
	}
	@media ${device.laptop} {
		padding: 3rem 2rem;
	}
`;

export const OtpCard = styled(motion.div)`
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
	
	.dark & {
		color: #f1f5f9;
	}
`;

export const Subtitle = styled.p`
	font-size: 0.95rem;
	color: #475569;
	text-align: center;
	margin-bottom: 1.5rem;
	line-height: 1.5;
	
	.dark & {
		color: #cbd5e1;
	}
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
	gap: 0.5rem;
`;

export const Label = styled.label`
	font-size: 0.9rem;
	font-weight: 600;
	color: #1f2937;
	margin-bottom: 0.25rem;
	
	.dark & {
		color: #e2e8f0;
	}
`;

export const RadioGroup = styled.div`
	display: flex;
	gap: 1rem;
	flex-wrap: wrap;
`;

export const RadioOption = styled.label`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.75rem 1rem;
	border: 2px solid #e2e8f0;
	border-radius: 12px;
	background: #f8fafc;
	cursor: pointer;
	transition: all 0.2s ease;
	flex: 1;
	min-width: 140px;

	&:hover {
		border-color: #4f46e5;
		background: #ffffff;
	}

	input[type="radio"] {
		width: 18px;
		height: 18px;
		cursor: pointer;
		accent-color: #4f46e5;
	}

	&:has(input:checked) {
		border-color: #4f46e5;
		background: rgba(79, 70, 229, 0.08);
	}

	span {
		font-size: 0.95rem;
		font-weight: 600;
		color: #1f2937;
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

	&:focus {
		outline: none;
		border-color: #4f46e5;
		box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.18);
		background: #ffffff;
	}

	&::placeholder {
		color: #94a3b8;
	}
`;

export const CheckboxWrapper = styled.label`
	display: flex;
	align-items: flex-start;
	gap: 0.6rem;
	cursor: pointer;
	padding: 0.5rem 0;

	input[type="checkbox"] {
		width: 18px;
		height: 18px;
		margin-top: 0.15rem;
		cursor: pointer;
		accent-color: #4f46e5;
		flex-shrink: 0;
	}

	span {
		font-size: 0.9rem;
		color: #475569;
		line-height: 1.5;

		a {
			color: #4f46e5;
			font-weight: 700;
			text-decoration: none;

			&:hover {
				text-decoration: underline;
			}
		}
	}
`;

export const ErrorMessage = styled.div`
	color: var(--danger-color);
	font-size: 0.8rem;
	margin-top: 0.25rem;
`;

export const SubmitButton = styled(motion.button)`
	padding: 0.9rem;
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
	margin-top: 0.5rem;

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
