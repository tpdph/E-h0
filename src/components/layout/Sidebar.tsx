import { Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
import type { Tab, TabType } from '../../types';

interface SidebarProps {
  tabs: Tab[];
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <nav className="w-16 bg-[var(--bg-secondary)] border-r border-[var(--border-primary)] flex flex-col items-center py-4 gap-4">
      {tabs.map((tab) => (
        <Tooltip key={tab.id} title={tab.label} placement="right">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`nav-item ${activeTab === tab.id ? 'active' : ''} p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors`}
            onClick={() => onTabChange(tab.id)}
            aria-label={tab.label}
            aria-pressed={activeTab === tab.id}
          >
            {tab.icon}
          </motion.button>
        </Tooltip>
      ))}
    </nav>
  );
}; 