import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Archive, Bot, Database, MessageSquare, Settings2 } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import type { TabType } from '../../types';
import { MainContent } from './MainContent';
import { Sidebar } from './Sidebar';

export const AppContent: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>('chat');

  const tabs = [
    { id: 'chat', icon: <MessageSquare className="w-5 h-5" />, label: t('nav.chat') },
    { id: 'knowledge', icon: <Database className="w-5 h-5" />, label: t('nav.knowledge') },
    { id: 'assistant', icon: <Bot className="w-5 h-5" />, label: t('nav.assistant.title') },
    { id: 'cantera', icon: <Archive className="w-5 h-5" />, label: t('nav.cantera') },
    { id: 'settings', icon: <Settings2 className="w-5 h-5" />, label: t('nav.settings') }
  ] as const;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen bg-[var(--bg-primary)] theme-transition">
        <div className="flex min-h-screen">
          <Sidebar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          <MainContent activeTab={activeTab} />
        </div>
      </div>
    </ThemeProvider>
  );
}; 