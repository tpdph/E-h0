import type { ReactNode } from 'react';

export type ThemeType = 'purple' | 'crimson' | 'mono' | 'neon' | 'ocean';
export type ThemeModeType = 'dark' | 'light';

export type TabType = 'chat' | 'knowledge' | 'assistant' | 'cantera' | 'settings';

export interface Tab {
  id: TabType;
  icon: ReactNode;
  label: string;
} 