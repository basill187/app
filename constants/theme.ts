import { Platform } from 'react-native';

export const theme = {
  colors: {
    primary: '#0A84FF',
    primaryLight: '#64B5FF',
    secondary: '#5E5CE6',
    accent: '#FF3B30',
    success: '#34C759',
    warning: '#FFCC00',
    error: '#FF3B30',
    
    background: Platform.OS === 'ios' ? '#F2F2F7' : '#F3F3F3',
    backgroundLight: Platform.OS === 'ios' ? '#FFFFFF' : '#FAFAFA',
    card: '#FFFFFF',
    
    text: '#000000',
    textLight: '#8E8E93',
    
    border: '#E5E5EA',
    
    gray: {
      100: '#F2F2F7',
      200: '#E5E5EA',
      300: '#D1D1D6',
      400: '#C7C7CC',
      500: '#8E8E93',
      600: '#636366',
      700: '#48484A',
      800: '#3A3A3C',
      900: '#2C2C2E',
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    round: 9999,
  },
  
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 3.84,
      elevation: 3,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 5.46,
      elevation: 5,
    },
  },
  
  // Dark mode colors (to be applied conditionally)
  dark: {
    background: '#000000',
    backgroundLight: '#1C1C1E',
    card: '#1C1C1E',
    text: '#FFFFFF',
    textLight: '#8E8E93',
    border: '#38383A',
  },
  
  // Fonts - Using system fonts since we're not loading custom fonts in this implementation
  // These would be replaced with actual font families when using expo-google-fonts
  fonts: {
    regular: Platform.OS === 'ios' ? 'System' : 'Roboto',
    medium: Platform.OS === 'ios' ? 'System' : 'Roboto-Medium',
    bold: Platform.OS === 'ios' ? 'System' : 'Roboto-Bold',
  },
  
  animation: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
};