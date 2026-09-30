/**
 * CineFolio Centralized Design Tokens
 * 
 * Defines core variables, mathematical scales, typography rules,
 * elevation, and effect constants for CineFolio themes.
 */

export interface DesignTokens {
  colors: {
    background: string;
    surface: string;
    surfaceElevated: string;
    surfaceHover: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    border: string;
    borderFocus: string;
    accentPrimary: string;
    accentSecondary: string;
    accentGlow: string;
    statusSuccess: string;
    statusWarning: string;
    statusDanger: string;
    statusInfo: string;
  };
  typography: {
    fontDisplay: string;
    fontHeading: string;
    fontBody: string;
    fontMono: string;
    scaleRatio: number;
    baseFontSize: string;
    lineHeightBody: number;
    lineHeightHeading: number;
    letterSpacingDisplay: string;
    letterSpacingHeading: string;
    letterSpacingBody: string;
  };
  spacing: {
    unit: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    sectionPadding: string;
    containerMax: string;
  };
  radius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
    cardOuter: string;
    cardInner: string;
  };
  shadows: {
    subtle: string;
    elevated: string;
    glow: string;
    glowPrimary: string;
  };
  animation: {
    durationFast: string;
    durationNormal: string;
    durationSlow: string;
    easeOutQuint: string;
    easeInOutExpo: string;
    easeSpring: string;
  };
  zIndex: {
    background: number;
    canvas: number;
    content: number;
    header: number;
    sticky: number;
    dropdown: number;
    modalBackdrop: number;
    modalContent: number;
    toast: number;
    cursor: number;
  };
  effects: {
    glassBlur: string;
    glassOpacity: number;
    grainOpacity: number;
    scanlineOpacity: number;
    crtCurvature: boolean;
    auroraSpeed: string;
  };
}

export const defaultDesignTokens: DesignTokens = {
  colors: {
    background: '#07070a',
    surface: '#0d0d12',
    surfaceElevated: '#14141d',
    surfaceHover: '#1c1c28',
    textPrimary: '#f4f4f6',
    textSecondary: '#a1a1aa',
    textMuted: '#71717a',
    border: 'rgba(255, 255, 255, 0.08)',
    borderFocus: '#6366f1',
    accentPrimary: '#6366f1',
    accentSecondary: '#8b5cf6',
    accentGlow: 'rgba(99, 102, 241, 0.25)',
    statusSuccess: '#10b981',
    statusWarning: '#f59e0b',
    statusDanger: '#ef4444',
    statusInfo: '#3b82f6',
  },
  typography: {
    fontDisplay: '"Cabinet Grotesk", "Syne", "Space Grotesk", sans-serif',
    fontHeading: '"Plus Jakarta Sans", "Inter", sans-serif',
    fontBody: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontMono: '"JetBrains Mono", "Fira Code", monospace',
    scaleRatio: 1.25,
    baseFontSize: '16px',
    lineHeightBody: 1.6,
    lineHeightHeading: 1.15,
    letterSpacingDisplay: '-0.035em',
    letterSpacingHeading: '-0.02em',
    letterSpacingBody: '0em',
  },
  spacing: {
    unit: '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '64px',
    sectionPadding: '96px',
    containerMax: '1280px',
  },
  radius: {
    none: '0px',
    sm: '6px',
    md: '10px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
    cardOuter: '16px',
    cardInner: '12px', // Following Inner Radius = Outer Radius - Padding rule
  },
  shadows: {
    subtle: '0 2px 8px rgba(0, 0, 0, 0.3)',
    elevated: '0 12px 32px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.3)',
    glow: '0 0 40px rgba(99, 102, 241, 0.2)',
    glowPrimary: '0 0 60px rgba(99, 102, 241, 0.35)',
  },
  animation: {
    durationFast: '150ms',
    durationNormal: '300ms',
    durationSlow: '600ms',
    easeOutQuint: 'cubic-bezier(0.22, 1, 0.36, 1)',
    easeInOutExpo: 'cubic-bezier(0.87, 0, 0.13, 1)',
    easeSpring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  zIndex: {
    background: 0,
    canvas: 1,
    content: 10,
    header: 40,
    sticky: 45,
    dropdown: 50,
    modalBackdrop: 90,
    modalContent: 100,
    toast: 110,
    cursor: 120,
  },
  effects: {
    glassBlur: '16px',
    glassOpacity: 0.7,
    grainOpacity: 0.04,
    scanlineOpacity: 0.06,
    crtCurvature: false,
    auroraSpeed: '20s',
  },
};
