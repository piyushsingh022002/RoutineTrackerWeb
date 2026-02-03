import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../pages.styles/PublicNoteEditor.style';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { markdown } from '@codemirror/lang-markdown';
import Button from '../components/common/Button';
import ROUTE_PATHS from '../routes/RoutePaths';

const PublicNoteEditor: React.FC = () => {
	const editorRef = useRef<HTMLDivElement | null>(null);
	const [loading, setLoading] = useState(true);
	const [visible, setVisible] = useState(false);
	const [theme, setTheme] = useState<'light' | 'dark'>('light');
	const [zoom, setZoom] = useState<number>(100);
	const [mode, setMode] = useState<'rich' | 'code'>('rich');
	const [codeLang, setCodeLang] = useState<string>('javascript');
	const [codeText, setCodeText] = useState<string>('');
	const navigate = useNavigate();

	useEffect(() => {
		// Two-stage entry: show "UI is coming" then reveal editor
		const t1 = setTimeout(() => setLoading(false), 700); // show "coming" for a short while
		const t2 = setTimeout(() => setVisible(true), 980); // reveal content after overlay fades
		return () => { clearTimeout(t1); clearTimeout(t2); };
	}, []);

	const exec = (cmd: string, val?: string) => {
		document.execCommand(cmd, false, val || undefined);
		editorRef.current?.focus();
	};

	const getContent = () => {
		if (mode === 'code') {
			return `<pre><code>${codeText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
		}
		return editorRef.current?.innerHTML || '';
	};

	const downloadWord = () => {
		const content = getContent();
		const header = '<!doctype html><html><head><meta charset="utf-8"></head><body>';
		const footer = '</body></html>';
		const blob = new Blob([header + content + footer], { type: 'application/msword' });
		const url = URL.createObjectURL(blob);
		const w = window.open(url, '_blank', 'noopener,noreferrer');
		if (!w) {
			// Fallback: download directly if popup blocked
			const a = document.createElement('a');
			a.href = url;
			a.download = 'note.doc';
			a.click();
		}
		setTimeout(() => URL.revokeObjectURL(url), 100);
	};

	const downloadPDF = () => {
		// Open printable window in new tab so user can save as PDF via browser print
		const content = getContent();
		const w = window.open('', '_blank', 'noopener,noreferrer');
		if (!w) return;
		w.document.write('<!doctype html><html><head><meta charset="utf-8"><title>Export Note</title>');
		w.document.write('<style>body{font-family:Inter,Arial; padding:24px; line-height:1.4; color:#111} img{max-width:100%;} pre{background:#f5f5f5; padding:12px; border-radius:4px; overflow-x:auto;} code{font-family:monospace;} @media print { body { padding: 0; } }</style>');
		w.document.write('</head><body>');
		w.document.write(content);
		w.document.write('</body></html>');
		w.document.close();
		setTimeout(() => { w.print(); }, 500);
	};

	const sendEmail = () => {
		const subject = encodeURIComponent('Shared note from InternRoutineTracker');
		const body = encodeURIComponent(stripHTML(getContent()).slice(0, 4000) + '\n\n(Use copy-paste to include formatting or attach exported file)');
		window.location.href = `mailto:?subject=${subject}&body=${body}`;
	};

	const stripHTML = (html = '') => {
		const tmp = document.createElement('div');
		tmp.innerHTML = html;
		return tmp.innerText || tmp.textContent || '';
	};

	// Theme switcher
	const toggleTheme = () => {
		setTheme((t) => (t === 'light' ? 'dark' : 'light'));
	};

	// Zoom controls
	const zoomIn = () => setZoom((z) => Math.min(200, z + 10));
	const zoomOut = () => setZoom((z) => Math.max(50, z - 10));

	// Beautify / format functions
	const beautifyHTML = (raw: string) => {
		try {
			const doc = new DOMParser().parseFromString(raw, 'text/html');
			const tidy = (node: Node, indent = 0) => {
				const pad = '\n' + '  '.repeat(indent);
				let out = '';
				node.childNodes.forEach((n) => {
					if (n.nodeType === Node.TEXT_NODE) {
						const txt = (n.textContent || '').trim();
						if (txt) out += pad + txt;
					} else if (n.nodeType === Node.ELEMENT_NODE) {
						const el = n as Element;
						out += pad + '<' + el.tagName.toLowerCase();
						for (let i = 0; i < el.attributes.length; i++) {
							const a = el.attributes[i];
							out += ` ${a.name}="${a.value}"`;
						}
						out += '>';
						out += tidy(n, indent + 1);
						out += pad + `</${el.tagName.toLowerCase()}>`;
					}
				});
				return out;
			};
			const body = doc.body;
			return tidy(body, 0).trim();
		} catch (e) {
			return raw;
		}
	};

	const beautify = () => {
		if (mode === 'code') {
			// simple normalize lines for code
			const formatted = codeText.split('\n').map((l) => l.replace(/\t/g, '  ').replace(/\s+$/g, '')).join('\n');
			setCodeText(formatted);
		} else {
			const html = getContent();
			const formatted = beautifyHTML(html);
			if (editorRef.current) editorRef.current.innerHTML = formatted;
		}
	};

	// Switch between rich and code modes
	const switchToCode = () => {
		// dump current rich HTML into code editor
		const html = getContent();
		setCodeText(html || '');
		setMode('code');
	};

	const switchToRich = () => {
		// set editor innerHTML to code text
		if (editorRef.current) editorRef.current.innerHTML = codeText;
		setMode('rich');
	};

	return (
		<S.Page>
			{loading && (
				<S.LoadingOverlay>
					<S.Loader />
					<S.ComingText>UI is coming…</S.ComingText>
				</S.LoadingOverlay>
			)}

			<S.Toolbar aria-hidden={loading} data-theme={theme}>
				<div>
					<Button variant="outline" size="small" onClick={() => navigate(ROUTE_PATHS.LANDINGPAGE)}>🏠 Home</Button>
				</div>

				<div>
					<button onClick={() => exec('bold')} title="Bold">B</button>
					<button onClick={() => exec('italic')} title="Italic">I</button>
					<button onClick={() => exec('underline')} title="Underline">U</button>
					<button onClick={() => exec('insertUnorderedList')} title="Bulleted">•</button>
					<button onClick={() => exec('insertOrderedList')} title="Numbered">1.</button>
					<button onClick={() => exec('justifyLeft')} title="Left">⟵</button>
					<button onClick={() => exec('justifyCenter')} title="Center">≡</button>
					<button onClick={() => exec('justifyRight')} title="Right">⟶</button>
				</div>

				<div>
					<S.ActionButton onClick={zoomOut} title="Zoom out">−</S.ActionButton>
					<S.ActionButton onClick={zoomIn} title="Zoom in">+</S.ActionButton>
					<S.ActionButton onClick={beautify} title="Beautify/Format">Format</S.ActionButton>
					<S.ActionButton onClick={() => (mode === 'rich' ? switchToCode() : switchToRich())} title="Toggle code view">{mode === 'rich' ? 'Code' : 'Rich'}</S.ActionButton>

					<select value={codeLang} onChange={(e) => setCodeLang(e.target.value)} style={{ marginLeft: 8, padding: '6px 8px', borderRadius: 8 }}>
						<option value="javascript">JavaScript</option>
						<option value="python">Python</option>
						<option value="html">HTML</option>
						<option value="markdown">Markdown</option>
					</select>

					<S.ActionButton onClick={downloadPDF} title="Download PDF">PDF</S.ActionButton>
					<S.ActionButton onClick={downloadWord} title="Download Word">Word</S.ActionButton>
					<S.ActionButton onClick={sendEmail} title="Send via Email">Email</S.ActionButton>
					<S.SignUpButton onClick={() => navigate('/register')}>Sign Up</S.SignUpButton>
					<S.ActionButton onClick={toggleTheme} title="Toggle theme" style={{ marginLeft: 8 }}>{theme === 'light' ? '🌤️' : '🌙'}</S.ActionButton>
				</div>
			</S.Toolbar>
			<S.Content className={visible ? 'visible' : ''} data-theme={theme}>
				<S.EditorContainer style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}>
					{mode === 'rich' ? (
						<S.Editor
							ref={editorRef}
							contentEditable
							suppressContentEditableWarning
							spellCheck
							data-placeholder="Start typing your public note..."
							aria-label="Public note editor"
						/>
					) : (
						<div style={{ background: theme === 'dark' ? '#0b0f17' : '#fff', borderRadius: 8, padding: 8 }}>
							<CodeMirror
								value={codeText}
								height="60vh"
								theme={theme === 'dark' ? 'dark' : 'light'}
								extensions={getCodeExtension(codeLang)}
								onChange={(val) => setCodeText(val)}
							/>
						</div>
					)}
				</S.EditorContainer>
			</S.Content>
		</S.Page>
	);
};

// helper to map selected language to CodeMirror extension
function getCodeExtension(lang: string) {
	switch (lang) {
		case 'javascript':
			return [javascript()];
		case 'python':
			return [python()];
		case 'html':
			return [html()];
		case 'markdown':
			return [markdown()];
		default:
			return [];
	}
}

export default PublicNoteEditor;

