
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { device } from '../styles/breakpoints';

export const LoginContainer = styled.div`
	min-height: 100vh;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem 0.5rem;
	background: linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%);
	box-sizing: border-box;
	@media ${device.tablet} {
		padding: 2rem 1rem;
	}
	@media ${device.laptop} {
		padding: 3rem 2rem;
	}
`;

export const LoginCard = styled(motion.div)`
	width: 100%;
	max-width: 400px;
	justify-content: center;
	display: flex;
	align-items: center;
	flex-direction: column;
	background-color: white;
	border-radius: var(--radius-lg);
	box-shadow: var(--shadow-lg);
	padding: 1.25rem;
	@media ${device.tablet} {
		padding: 2rem;
	}
	@media ${device.mobile} {
		padding: 0.75rem;
	}
`;

export const Logo = styled.div`
	font-size: 1.5rem;
	font-weight: 700;
	color: var(--primary-color);
	text-align: center;
	margin-bottom: 2rem;
`;

export const Title = styled.h1`
	font-size: 1.5rem;
	font-weight: 600;
	text-align: center;
	margin-bottom: 1.5rem;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
`;

export const FormGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const Label = styled.label`
	font-size: 0.875rem;
	font-weight: 500;
`;

export const Input = styled.input`
	padding: 0.75rem;
	border: 1px solid var(--border-color);
	border-radius: var(--radius);
	font-size: 0.875rem;
	transition: var(--transition);

	&:focus {
		outline: none;
		border-color: var(--primary-color);
		box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
	}
`;

export const ErrorMessage = styled.div`
	color: var(--danger-color);
	font-size: 0.75rem;
	margin-top: 0.25rem;
`;

export const SubmitButton = styled(motion.button)`
	padding: 0.75rem;
	background-color: var(--primary-color);
	color: white;
	border: none;
	border-radius: var(--radius);
	font-weight: 500;
	cursor: pointer;
	transition: var(--transition);

	&:hover {
		background-color: var(--primary-hover);
	}

	&:disabled {
		background-color: var(--text-light);
		cursor: not-allowed;
	}
`;

export const SignUpText = styled.div`
	text-align: center;
	font-size: 0.875rem;
	margin-top: 1.5rem;
`;

export const SignUpLink = styled(Link)`
	color: var(--primary-color);
	font-weight: 500;
	margin-left: 0.25rem;

	&:hover {
		text-decoration: underline;
	}
`;
