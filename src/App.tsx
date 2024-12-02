import { useState } from 'react';
import { MessageSquare, Settings2, Archive, Database, Bot } from 'lucide-react';
import { ChatInterface } from './components/ChatInterface';
import KnowledgeBase from './components/knowledge/KnowledgeBase';
import { Settings } from './components/Settings';
import CanteraRepository from './components/cantera/CanteraRepository';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Tooltip } from '@mui/material';
import { useAppTheme } from './theme';
import './i18n';
import LanguageSelector from './components/LanguageSelector';
import AssistantCreation from './components/assistant/AssistantCreation';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeSelector from './components/ThemeSelector';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from './components/ErrorBoundary';
import { StrictMode } from 'react';

const queryClient = new QueryClient();

type TabType = 'chat' | 'knowledge' | 'assistant' | 'cantera' | 'settings';

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <StrictMode>
            <AppContent />
          </StrictMode>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

function AppContent() {
  const theme = useAppTheme();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>('chat');

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatInterface />;
      case 'knowledge':
        return <KnowledgeBase />;
      case 'assistant':
        return <AssistantCreation />;
      case 'cantera':
        return <CanteraRepository />;
      case 'settings':
        return <Settings />;
      default:
        return <ChatInterface />;
    }
  };

  const tabs = [
    { id: 'chat' as TabType, icon: <MessageSquare className="w-5 h-5" />, label: t('nav.chat') },
    { id: 'knowledge' as TabType, icon: <Database className="w-5 h-5" />, label: t('nav.knowledge') },
    { id: 'assistant' as TabType, icon: <Bot className="w-5 h-5" />, label: t('nav.assistant.title') },
    { id: 'cantera' as TabType, icon: <Archive className="w-5 h-5" />, label: t('nav.cantera') },
    { id: 'settings' as TabType, icon: <Settings2 className="w-5 h-5" />, label: t('nav.settings') }
  ];

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen bg-[var(--bg-primary)] theme-transition">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <nav className="w-16 bg-[var(--bg-secondary)] border-r border-[var(--border-primary)] flex flex-col items-center py-4 gap-4">
            <div className="flex-1 flex flex-col items-center gap-2">
              <ThemeSelector />
              <LanguageSelector />
              {tabs.map((tab) => (
                <Tooltip key={tab.id} title={tab.label} placement="right">
                  <button
                    className={`nav-item ${activeTab === tab.id ? 'active' : ''} p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors`}
                    onClick={() => setActiveTab(tab.id)}
                    aria-label={tab.label}
                  >
                    {tab.icon}
                  </button>
                </Tooltip>
              ))}
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 bg-[var(--bg-primary)] p-6 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </MuiThemeProvider>
  );
}

export default App;