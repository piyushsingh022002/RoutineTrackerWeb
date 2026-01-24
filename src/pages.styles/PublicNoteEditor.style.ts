import styled, { keyframes } from 'styled-components';

const Page = styled.div`
	width: 100%;
	min-height: calc(100vh - var(--header-height, 72px));
	padding: 1.5rem;
	box-sizing: border-box;
	background: linear-gradient(180deg, #fafbff 0%, #ffffff 100%);
	
	.dark & {
		background: linear-gradient(180deg, #0f172a 0%, #1a1f35 100%);
	}
`;

const pulse = keyframes`
	0% { transform: translateY(0); opacity: 0.95 }
	50% { transform: translateY(-8px); opacity: 0.65 }
	100% { transform: translateY(0); opacity: 0.95 }
`;

const LoadingOverlay = styled.div`
	position: fixed;
	inset: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: linear-gradient(180deg, rgba(250,250,255,0.95), rgba(250,250,255,0.9));
	z-index: 9999;
	gap: 14px;
	color: #0b1a3a;
	
	.dark & {
		background: linear-gradient(180deg, rgba(15,23,42,0.95), rgba(26,31,53,0.9));
		color: #f1f5f9;
	}
`;

const Loader = styled.div`
	width: 84px;
	height: 84px;
	border-radius: 14px;
	background: linear-gradient(135deg, #5a7dfd, #8ec6ff);
	box-shadow: 0 12px 36px rgba(74,108,247,0.12);
	animation: ${pulse} 1.2s ease-in-out infinite;
`;

const ComingText = styled.div`
	font-weight: 600;
	color: #2b3aeb;
	letter-spacing: 0.2px;
`;

const reveal = keyframes`
	from { opacity: 0; transform: translateY(6px); }
	to { opacity: 1; transform: translateY(0); }
`;

const Toolbar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 12px;
	padding: 8px 10px;
	background: white;
	border-radius: 10px;
	box-shadow: 0 8px 22px rgba(12,23,55,0.06);
	margin-bottom: 14px;
	position: relative; /* avoid overlapping with header */
	z-index: 10;
	
	.dark & {
		background: #1e293b;
		box-shadow: 0 8px 22px rgba(0,0,0,0.3);
	}

	& > div:first-child {
		display: flex;
		gap: 6px;
		align-items: center;

		button {
			background: transparent;
			border: 1px solid transparent;
			padding: 6px 8px;
			border-radius: 8px;
			cursor: pointer;
			font-weight: 600;
			color: #222;
			transition: all 160ms ease;
			font-size: 0.95rem;
			line-height: 1;
			
			.dark & {
				color: #e2e8f0;
			}
		}

		button:hover {
			background: #f3f7ff;
			transform: translateY(-2px);
			box-shadow: 0 6px 18px rgba(74,108,247,0.07);
		}
	}
`;

const ActionButton = styled.button`
	background: #f0f5ff;
	border: 1px solid rgba(74,108,247,0.08);
	padding: 6px 10px;
	border-radius: 8px;
	margin-left: 8px;
	cursor: pointer;
	font-weight: 600;
	color: #2b3aeb;
	font-size: 0.92rem;
	transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;

	&:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 26px rgba(74,108,247,0.08);
		background: #eef6ff;
	}
`;

const SignUpButton = styled(ActionButton)`
	background: linear-gradient(90deg,#4a6cf7,#7bb9ff);
	color: white;
	border: none;
	padding: 6px 12px;
`;

const EditorContainer = styled.div`
	background: white;
	border-radius: 12px;
	padding: 14px;
	min-height: 60vh;
	box-shadow: 0 12px 36px rgba(12,23,55,0.04);
	overflow: hidden;
	animation: ${reveal} 360ms ease both;
`;

const Editor = styled.div`
	min-height: 48vh;
	outline: none;
	font-family: Inter, Arial, sans-serif;
	font-size: 1rem;
	color: #111;
	line-height: 1.6;

	&[data-placeholder]:empty:before {
		content: attr(data-placeholder);
		color: #a7b4d2;
		pointer-events: none;
		display: block;
		font-size: 0.98rem;
	}

	img { max-width: 100%; }
`;

const Content = styled.div`
	opacity: 0;
	transform: translateY(6px);
	transition: opacity 300ms ease, transform 320ms ease;
	&.visible { opacity: 1; transform: translateY(0); }
`;

export { Page, LoadingOverlay, Loader, ComingText, Toolbar, ActionButton, SignUpButton, EditorContainer, Editor, Content };

