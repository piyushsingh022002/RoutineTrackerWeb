import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .dark {
    --primary-color: #6366f1;
    --primary-hover: #818cf8;
    --secondary-color: #34d399;
    --secondary-hover: #6ee7b7;
    --danger-color: #f87171;
    --danger-hover: #fca5a5;
    --text-color: #f3f4f6;
    --text-light: #9ca3af;
    --bg-color: #18181b;
    --bg-light: #27272a;
    --bg-dark: #111827;
    --border-color: #27272a;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.35), 0 1px 2px 0 rgba(0, 0, 0, 0.25);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.35), 0 2px 4px -1px rgba(0, 0, 0, 0.28);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.45), 0 4px 6px -2px rgba(0,0,0,0.35);
  }

  .dark body {
  color: var(--text-color);
  background: radial-gradient(1200px 800px at 20% 10%, rgba(99,102,241,0.08), transparent 40%),
        radial-gradient(1000px 700px at 80% 0%, rgba(59,130,246,0.06), transparent 45%),
        var(--bg-color);
  }
  :root {
    --primary-color: #4f46e5;
    --primary-hover: #4338ca;
    --secondary-color: #10b981;
    --secondary-hover: #059669;
    --danger-color: #ef4444;
    --danger-hover: #dc2626;
    --text-color: #1f2937;
    --text-light: #6b7280;
    --bg-color: #f9fafb;
    --bg-light: #ffffff;
    --bg-dark: #111827;
    --border-color: #e5e7eb;
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --radius-sm: 0.125rem;
    --radius: 0.25rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
    --transition: all 0.2s ease-in-out;
    --easing-out: cubic-bezier(0.16, 1, 0.3, 1);
    --easing-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  }
  html {
    font-size: 16px;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', Arial, Helvetica, sans-serif;
    background:
      radial-gradient(1000px 700px at 15% -10%, rgba(99,102,241,0.08), transparent 40%),
      radial-gradient(900px 600px at 85% -10%, rgba(59,130,246,0.06), transparent 45%),
      #f8f9fa;
    color: #222;
    min-height: 100vh;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 220ms var(--easing-in-out), color 220ms var(--easing-in-out);
  }
  img, video {
    max-width: 100%;
    height: auto;
    display: block;
  }
  a {
    color: var(--text-color);
    text-decoration: none;
    transition: color 160ms var(--easing-out), text-decoration-color 160ms var(--easing-out);
  }
  button, input, textarea, select {
    font: inherit;
  }
  ::selection {
    background: rgba(99,102,241,0.25);
  }
  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition: none !important;
      scroll-behavior: auto !important;
    }
  }
  
  // Responsive typography
  h1 {
    font-size: 2.5rem;
    @media (max-width: 768px) {
      font-size: 2rem;
    }
    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  }
  h2 {
    font-size: 2rem;
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
    @media (max-width: 480px) {
      font-size: 1.2rem;
    }
  }
  h3 {
    font-size: 1.5rem;
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
`;

export default GlobalStyle;
