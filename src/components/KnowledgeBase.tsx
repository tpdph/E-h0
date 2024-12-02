import React from 'react';

export const KnowledgeBase: React.FC = () => {
  return (
    <div className="flex flex-col h-full w-full p-4 bg-[var(--bg-secondary)] text-[var(--text-primary)]">
      <h2 className="text-2xl font-semibold mb-4">Knowledge Base</h2>
      <div className="flex-1 overflow-y-auto">
        {/* Add your knowledge base content here */}
        <p>Knowledge base content will be displayed here.</p>
      </div>
    </div>
  );
};
