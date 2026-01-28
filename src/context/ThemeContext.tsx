import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  resetTheme: () => void;
  appearanceEnabled: boolean;
  setAppearanceEnabled: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'routineTrackerTheme';
const APPEARANCE_STORAGE_KEY = 'routineTrackerAppearance';

const isBrowser = () => typeof window !== 'undefined';

const readStoredTheme = (): Theme | null => {
  if (!isBrowser()) return null;
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === 'light' || stored === 'dark' ? stored : null;
};

const resolveInitialTheme = (): Theme => {
  // Always default to light theme
  return 'light';
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => resolveInitialTheme());
  const [hasUserPreference, setHasUserPreference] = useState<boolean>(() => readStoredTheme() !== null);
  const [appearanceEnabled, setAppearanceEnabled] = useState<boolean>(() => {
    if (!isBrowser()) return false;
    const stored = window.localStorage.getItem(APPEARANCE_STORAGE_KEY);
    return stored === 'true';
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const targets = [document.documentElement, document.body];
    targets.forEach((node) => {
      if (!node) return;
      node.classList.remove('light', 'dark');
      node.classList.add(theme);
      if (node === document.documentElement) {
        node.setAttribute('data-theme', theme);
      }
    });
  }, [theme]);

  useEffect(() => {
    if (!isBrowser() || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      if (hasUserPreference) {
        return;
      }
      setTheme(event.matches ? 'dark' : 'light');
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [hasUserPreference]);

  const toggleTheme = () => {
    if (!appearanceEnabled) return; // Don't allow theme toggle if appearance is disabled
    setTheme((prev) => {
      const nextTheme = prev === 'light' ? 'dark' : 'light';
      if (isBrowser()) {
        window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      }
      return nextTheme;
    });
    setHasUserPreference(true);
  };

  const handleSetAppearanceEnabled = (enabled: boolean) => {
    setAppearanceEnabled(enabled);
    if (isBrowser()) {
      window.localStorage.setItem(APPEARANCE_STORAGE_KEY, String(enabled));
    }
    // Reset to light theme when appearance is disabled
    if (!enabled) {
      setTheme('light');
      if (isBrowser()) {
        window.localStorage.setItem(THEME_STORAGE_KEY, 'light');
      }
    }
  };

  const resetTheme = () => {
    setTheme('light');
    setHasUserPreference(false);
    if (isBrowser()) {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, resetTheme, appearanceEnabled, setAppearanceEnabled: handleSetAppearanceEnabled }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
