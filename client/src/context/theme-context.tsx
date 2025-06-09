import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeType, themes, ThemeColors } from '@/config/themes';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeType;
}

export function ThemeProvider({ children, defaultTheme = 'deep-forest' }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeType>(defaultTheme);
  const [colors, setColors] = useState<ThemeColors>(themes[defaultTheme]);

  // Update colors when theme changes
  useEffect(() => {
    setColors(themes[theme]);
  }, [theme]);

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeType | null;
    if (savedTheme && themes[savedTheme as ThemeType]) {
      setTheme(savedTheme);
    }
  }, []);

  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        setTheme: handleThemeChange, 
        colors
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
