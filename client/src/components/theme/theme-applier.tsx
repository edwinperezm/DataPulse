import { useEffect } from 'react';
import { useTheme } from '@/context/theme-context';

export function ThemeApplier() {
  const { colors, theme } = useTheme();
  
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply background colors
    if (colors.background) {
      root.style.setProperty('--background-primary', colors.background.primary);
      root.style.setProperty('--background-secondary', colors.background.secondary);
      root.style.setProperty('--background-hover', colors.background.hover);
      root.style.setProperty('--background-active', colors.background.active);
    }
    
    // Apply text colors
    if (colors.text) {
      root.style.setProperty('--text-primary', colors.text.primary);
      root.style.setProperty('--text-secondary', colors.text.secondary);
      root.style.setProperty('--text-muted', colors.text.muted);
    }
    
    // Apply border colors
    if (colors.border) {
      root.style.setProperty('--border-default', colors.border.default);
      root.style.setProperty('--border-hover', colors.border.hover || colors.border.default);
    }
    
    // Apply accent colors with fallbacks
    if (colors.accent) {
      root.style.setProperty('--accent-primary', colors.accent.primary);
      root.style.setProperty('--accent-secondary', colors.accent.secondary);
      root.style.setProperty('--accent-success', colors.accent.success);
      root.style.setProperty('--accent-error', colors.accent.error);
      
      // Optional accent colors with fallbacks
      if (colors.accent.warning) {
        root.style.setProperty('--accent-warning', colors.accent.warning);
      }
      if (colors.accent.info) {
        root.style.setProperty('--accent-info', colors.accent.info);
      }
    }
    
    // Set theme attribute for theme-specific styles
    root.setAttribute('data-theme', theme);
    
    return () => {
      // Clean up all the CSS variables we set
      const variablesToRemove = [
        '--background-primary', '--background-secondary', '--background-hover', '--background-active',
        '--text-primary', '--text-secondary', '--text-muted',
        '--border-default', '--border-hover',
        '--accent-primary', '--accent-secondary', '--accent-success', '--accent-error', 
        '--accent-warning', '--accent-info'
      ];
      
      variablesToRemove.forEach(varName => {
        root.style.removeProperty(varName);
      });
      
      root.removeAttribute('data-theme');
    };
  }, [colors, theme]);

  return null;
}
