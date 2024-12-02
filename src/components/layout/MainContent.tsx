import React, { lazy, Suspense } from 'react';
import type { TabType } from '../../types';

// Lazy loading de componentes
const ChatInterface = lazy(() => import('../ChatInterface'));
const KnowledgeBase = lazy(() => import('../knowledge/KnowledgeBase'));
const AssistantCreation = lazy(() => import('../assistant/AssistantCreation'));
const CanteraRepository = lazy(() => import('../cantera/CanteraRepository'));
const Settings = lazy(() => import('../Settings'));

interface MainContentProps {
  activeTab: TabType;
}

export const MainContent: React.FC<MainContentProps> = ({ activeTab }) => {
  const renderContent = () => {
    const content = (() => {
      switch (activeTab) {
        case 'chat': return <ChatInterface />;
        case 'knowledge': return <KnowledgeBase />;
        case 'assistant': return <AssistantCreation />;
        case 'cantera': return <CanteraRepository />;
        case 'settings': return <Settings />;
        default: return <ChatInterface />;
      }
    })();

    return (
      <Suspense fallback={<div>Loading...</div>}>
        {content}
      </Suspense>
    );
  };

  return (
    <main className="flex-1 bg-[var(--bg-primary)] p-6 overflow-auto">
      {renderContent()}
    </main>
  );
}; 