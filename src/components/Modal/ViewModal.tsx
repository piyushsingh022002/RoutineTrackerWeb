import React, { useRef, useState } from 'react';
import Modal from './Modal';
import type { Note } from '../../types';
import {
	Wrapper,
	TopBar,
	LeftGroup,
	RightGroup,
	ActionButton,
	Dropdown,
	DropdownToggle,
	DropdownList,
	CheckboxRow,
	ApplyRow,
	ApplyButton,
	ContentArea,
	MetaRow,
	FooterBar,
	ThemeToggle,
} from './ViewModal.styles';

interface Props {
	open: boolean;
	onClose: () => void;
	onBack?: () => void; // go back to all notes dialogue
	onEdit?: (note?: Note) => void;
	note?: Note | null;
}

const FONT_OPTIONS = [
	{ id: 'sans', label: 'Sans-serif', family: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' },
	{ id: 'serif', label: 'Serif', family: 'Georgia, "Times New Roman", Times, serif' },
	{ id: 'mono', label: 'Monospace', family: 'Menlo, Monaco, "Courier New", monospace' },
	{ id: 'cursive', label: 'Cursive', family: 'cursive' },
];

const ViewModal: React.FC<Props> = ({ open, onClose, onBack, onEdit, note }) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const [selectedFonts, setSelectedFonts] = useState<Record<string, boolean>>({});
	const [appliedFont, setAppliedFont] = useState<string | undefined>(undefined);
	const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const toggleFont = (id: string) => {
		setSelectedFonts((s) => ({ ...s, [id]: !s[id] }));
	};

	const applyFonts = () => {
		// pick the first selected font's family
		const selected = FONT_OPTIONS.find((f) => selectedFonts[f.id]);
		setAppliedFont(selected ? selected.family : undefined);
		setShowDropdown(false);
	};

	const handleImportClick = () => {
		fileInputRef.current?.click();
	};

	const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const f = e.target.files && e.target.files[0];
		if (!f) return;
		try {
			const text = await f.text();
			// For quick import, overwrite note content (demo). In a full app, this should dispatch to save.
			alert('Imported note content (preview). In a real flow, this would create/update a note.');
			// If note exists, we could mutate locally for preview — not persisted here.
			// Here we just show it in a new window for demo purposes.
			const win = window.open('', '_blank');
			if (win) {
				win.document.write('<pre style="white-space:pre-wrap;font-family:inherit">' + escapeHtml(text) + '</pre>');
			}
		} catch (err) {
			console.error(err);
		}
		e.currentTarget.value = '';
	};

	const escapeHtml = (unsafe: string) => {
		return unsafe
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	};

	return (
		<Modal open={open} onClose={onClose} width="90vw">
			<Wrapper>
				<TopBar>
					<LeftGroup>
						<ActionButton onClick={onBack}>&larr; Back</ActionButton>
						<ActionButton onClick={() => onEdit && onEdit(note ?? undefined)} variant="ghost">Edit</ActionButton>
						<ActionButton onClick={handleImportClick} variant="ghost">Import note</ActionButton>
						<input ref={fileInputRef} type="file" accept=".txt,.md" style={{ display: 'none' }} onChange={handleFile} />
					</LeftGroup>

					<RightGroup>
						<Dropdown>
							<DropdownToggle onClick={() => setShowDropdown((s) => !s)}>Font style ▾</DropdownToggle>
							{showDropdown && (
								<DropdownList>
									{FONT_OPTIONS.map((f) => (
										<CheckboxRow key={f.id}>
											<input type="checkbox" checked={!!selectedFonts[f.id]} onChange={() => toggleFont(f.id)} />
											<span>{f.label}</span>
										</CheckboxRow>
									))}
									<ApplyRow>
										<ApplyButton onClick={applyFonts} variant="primary">Apply</ApplyButton>
									</ApplyRow>
								</DropdownList>
							)}
						</Dropdown>

						<ThemeToggle>
							<label style={{ fontSize: 13 }}>Theme:</label>
							<ActionButton onClick={() => setThemeMode('light')} variant={themeMode === 'light' ? 'primary' : 'ghost'}>Light</ActionButton>
							<ActionButton onClick={() => setThemeMode('dark')} variant={themeMode === 'dark' ? 'primary' : 'ghost'}>Dark</ActionButton>
						</ThemeToggle>

						<ActionButton onClick={onClose} variant="ghost">Close</ActionButton>
					</RightGroup>
				</TopBar>

				<MetaRow style={{ marginTop: 12 }}>
					<div style={{ fontWeight: 700, fontSize: 18 }}>{note?.title || 'Untitled'}</div>
					<div style={{ color: '#889' }}>{note ? new Date(note.createdAt).toLocaleString() : ''}</div>
				</MetaRow>

				<ContentArea themeMode={themeMode} fontFamily={appliedFont}>
					<div style={{ whiteSpace: 'pre-wrap' }}>{note?.content || 'No content'}</div>
				</ContentArea>

				<FooterBar>
					<div style={{ color: '#667', fontSize: 13 }}>{note?.tags && note.tags.length ? 'Tags: ' + note.tags.join(', ') : ''}</div>
					<div>
						<ActionButton
							onClick={() => {
								if (navigator.clipboard && note) {
									navigator.clipboard.writeText(note.content);
								}
								alert('Copied note content (demo)');
							}}
							variant="ghost"
						>
							Copy
						</ActionButton>
						<ActionButton onClick={onClose} variant="primary" style={{ marginLeft: 8 }}>Done</ActionButton>
					</div>
				</FooterBar>
			</Wrapper>
		</Modal>
	);
};

export default ViewModal;
