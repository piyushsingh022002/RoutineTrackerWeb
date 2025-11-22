import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	height: 90vh;
	display: flex;
	flex-direction: column;
`;

export const TopBar = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	padding-bottom: 10px;
	border-bottom: 1px solid #e6e9ef;
`;

export const LeftGroup = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
`;

export const RightGroup = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
`;

export const ActionButton = styled.button<{ variant?: 'ghost' | 'primary' }>`
	padding: 6px 8px;
	border-radius: 6px;
	border: 1px solid #e6e9ef;
	background: ${(p) => (p.variant === 'primary' ? '#3b82f6' : 'transparent')};
	color: ${(p) => (p.variant === 'primary' ? '#fff' : '#233')};
	cursor: pointer;
	font-weight: 600;
	font-size: 13px;
	min-width: 64px;
`;

export const Dropdown = styled.div`
	position: relative;
`;

export const DropdownToggle = styled.button`
	padding: 6px 8px;
	border-radius: 6px;
	border: 1px solid #e6e9ef;
	background: transparent;
	cursor: pointer;
	font-weight: 600;
	font-size: 13px;
`;

export const DropdownList = styled.div`
	position: absolute;
	right: 0;
	top: calc(100% + 8px);
	background: #fff;
	border: 1px solid #e6e9ef;
	box-shadow: 0 6px 18px rgba(16,24,40,0.06);
	border-radius: 8px;
	min-width: 220px;
	padding: 10px;
	z-index: 9999;
`;

export const CheckboxRow = styled.label`
	display: flex;
	align-items: center;
	gap: 8px;
	font-size: 13px;
	color: #223;
	padding: 6px 4px;
`;

export const ApplyRow = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 8px;
`;

export const ApplyButton = styled(ActionButton)`
	padding: 6px 8px;
	border-radius: 6px;
	font-size: 13px;
	min-width: 72px;
`;

export const ContentArea = styled.div<{ themeMode: 'light' | 'dark'; fontFamily?: string }>`
	flex: 1;
	overflow: auto;
	padding: 18px;
	background: ${(p) => (p.themeMode === 'dark' ? '#0f1724' : '#fff')};
	color: ${(p) => (p.themeMode === 'dark' ? '#e6eef8' : '#111827')};
	border-radius: 8px;
	margin-top: 12px;
	font-family: ${(p) => p.fontFamily || 'inherit'};
`;

export const MetaRow = styled.div`
	display: flex;
	gap: 12px;
	align-items: center;
	font-size: 13px;
	color: #556;
`;

export const FooterBar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 12px;
`;

export const ThemeToggle = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
`;

