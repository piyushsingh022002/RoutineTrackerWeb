import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'routineTrackerTheme';

const isBrowser = () => typeof window !== 'undefined';

const readStoredTheme = (): Theme | null => {
  if (!isBrowser()) return null;
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === 'light' || stored === 'dark' ? stored : null;
};

const getSystemTheme = (): Theme => {
  if (!isBrowser() || typeof window.matchMedia !== 'function') {
    return 'light';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const resolveInitialTheme = (): Theme => {
  const stored = readStoredTheme();
  return stored ?? getSystemTheme();
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => resolveInitialTheme());
  const [hasUserPreference, setHasUserPreference] = useState<boolean>(() => readStoredTheme() !== null);

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
    setTheme((prev) => {
      const nextTheme = prev === 'light' ? 'dark' : 'light';
      if (isBrowser()) {
        window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      }
      return nextTheme;
    });
    setHasUserPreference(true);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
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
