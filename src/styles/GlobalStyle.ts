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
  }

  .dark body {
    color: var(--text-color);
    background-color: var(--bg-color);
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
  }
  html {
    font-size: 16px;
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', Arial, Helvetica, sans-serif;
    background: #f8f9fa;
    color: #222;
    min-height: 100vh;
    line-height: 1.5;
  }
  img, video {
    max-width: 100%;
    height: auto;
    display: block;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  button, input, textarea, select {
    font: inherit;
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
