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
    --dashboard-base-start: #0b1120;
    --dashboard-base-end: #0f172a;
    --dashboard-overlay-1: rgba(79,70,229,0.2);
    --dashboard-overlay-2: rgba(14,165,233,0.18);
    --dashboard-overlay-3: rgba(236,72,153,0.12);
    --dashboard-hero-gradient: linear-gradient(135deg, #4338ca 0%, #0ea5e9 55%, #a855f7 100%);
    --dashboard-hero-text: #f8fafc;
    --dashboard-hero-border: rgba(255,255,255,0.12);
    --dashboard-hero-shadow: 0 15px 40px rgba(15,23,42,0.55);
    --dashboard-cta-gradient: linear-gradient(90deg, #6366f1, #0ea5e9, #a855f7, #6366f1);
    --dashboard-cta-border: rgba(148,163,184,0.35);
    --dashboard-cta-text: #f8fafc;
    --tile-spark-bg: rgba(255,255,255,0.16);
    --tile-spark-border: rgba(255,255,255,0.22);
    --streak-pill-bg: rgba(249,115,22,0.18);
    --streak-pill-border: rgba(248,113,22,0.5);
    --streak-pill-color: #fed7aa;
    --quick-item-bg: rgba(255,255,255,0.04);
    --quick-item-border: rgba(255,255,255,0.08);
    --quick-item-color: rgba(248,250,252,0.85);
    --dropdown-bg: #1f2937;
    --dropdown-shadow: 0 25px 60px rgba(2,6,23,0.55);
    --modal-surface: #1f2937;
    --modal-shadow: 0 18px 40px rgba(2,6,23,0.5);
    --header-gradient: linear-gradient(120deg, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.9) 100%);
    --header-link: #a5b4fc;
    --header-link-hover: #818cf8;
    --badge-bg: #f87171;
    --menu-hover-bg: rgba(255,255,255,0.08);
    --calendar-chip-hover: rgba(255,255,255,0.06);
    --card-border-strong: rgba(255,255,255,0.08);
    --sidebar-active-bg: rgba(99,102,241,0.18);
    --overlay-scrim: rgba(2,6,23,0.75);
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
    --dashboard-base-start: #f8fafc;
    --dashboard-base-end: #e0e7ff;
    --dashboard-overlay-1: rgba(165,180,252,0.25);
    --dashboard-overlay-2: rgba(79,70,229,0.12);
    --dashboard-overlay-3: rgba(14,165,233,0.12);
    --dashboard-hero-gradient: linear-gradient(120deg, #4a6cf7 0%, #22d3ee 50%, #a78bfa 100%);
    --dashboard-hero-text: #ffffff;
    --dashboard-hero-border: rgba(255,255,255,0.15);
    --dashboard-hero-shadow: 0 10px 30px rgba(74,108,247,0.25);
    --dashboard-cta-gradient: linear-gradient(90deg, #4a6cf7, #22d3ee, #a78bfa, #4a6cf7);
    --dashboard-cta-border: rgba(255,255,255,0.35);
    --dashboard-cta-text: #ffffff;
    --tile-spark-bg: rgba(255,255,255,0.2);
    --tile-spark-border: rgba(255,255,255,0.35);
    --streak-pill-bg: #fff7ed;
    --streak-pill-border: #fed7aa;
    --streak-pill-color: #f97316;
    --quick-item-bg: #f8fafc;
    --quick-item-border: #e5e7eb;
    --quick-item-color: #374151;
    --dropdown-bg: #ffffff;
    --dropdown-shadow: 0 20px 40px rgba(2,6,23,0.15);
    --modal-surface: #ffffff;
    --modal-shadow: 0 8px 32px rgba(74,108,247,0.13);
    --header-gradient: linear-gradient(120deg, rgba(248,250,252,0.92) 0%, rgba(224,231,255,0.92) 100%);
    --header-link: #4a6cf7;
    --header-link-hover: #1d4ed8;
    --badge-bg: #ef4444;
    --menu-hover-bg: #f3f4f6;
    --calendar-chip-hover: rgba(0,0,0,0.04);
    --sidebar-active-bg: rgba(79,70,229,0.12);
    --card-border-strong: rgba(15,23,42,0.08);
    --overlay-scrim: rgba(15,23,42,0.45);
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
