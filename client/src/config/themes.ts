export type ThemeType = 'sand' | 'deep-forest' | 'charcoal' | 'white-clouds';

export interface ThemeColors {
  background: {
    primary: string;
    secondary: string;
    hover: string;
    active: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  border: {
    default: string;
    hover: string;
  };
  accent: {
    primary: string;
    secondary: string;
    success: string;
    error: string;
    warning?: string;
    info?: string;
  };
}

export const themes: Record<ThemeType, ThemeColors> = {
  'sand': {
    background: {
      primary: '#F5F5DC',
      secondary: '#E6D5AC',
      hover: '#DBC69F',
      active: '#C4B086'
    },
    text: {
      primary: '#4A4737',
      secondary: '#6B6854',
      muted: '#8A8774'
    },
    border: {
      default: '#DBC69F',
      hover: '#C4B086'
    },
    accent: {
      primary: '#BF9B6F',
      secondary: '#A67F51',
      success: '#4CAF50',
      error: '#F44336'
    }
  },
  'deep-forest': {
    background: {
      primary: '#0E1A1D',
      secondary: '#020E13',
      hover: '#132622',
      active: '#1A2A26'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#98B0AF',
      muted: '#607877'
    },
    border: {
      default: '#243531',
      hover: '#3D4F4D'
    },
    accent: {
      primary: '#98B0AF',
      secondary: '#607877',
      success: '#4CAF50',
      error: '#FF4E61',
      warning: '#FFA000',
      info: '#2196F3'
    }
  },
  'charcoal': {
    background: {
      primary: '#1C1C1C',
      secondary: '#2A2A2A',
      hover: '#383838',
      active: '#454545'
    },
    text: {
      primary: '#E6E6E6',
      secondary: '#BFBFBF',
      muted: '#999999'
    },
    border: {
      default: '#383838',
      hover: '#454545'
    },
    accent: {
      primary: '#666666',
      secondary: '#808080',
      success: '#4CAF50',
      error: '#F44336'
    }
  },
  'white-clouds': {
    background: {
      primary: '#FFFFFF',
      secondary: '#F8F9FA',
      hover: '#F1F3F5',
      active: '#E9ECEF'
    },
    text: {
      primary: '#212529',
      secondary: '#495057',
      muted: '#868E96'
    },
    border: {
      default: '#DEE2E6',
      hover: '#CED4DA'
    },
    accent: {
      primary: '#ADB5BD',
      secondary: '#868E96',
      success: '#4CAF50',
      error: '#F44336'
    }
  }
} as const;
