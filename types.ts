export interface Message {
  id?: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp?: Date;
}

export interface KnowledgeItem {
  id?: string;
  content: string;
  source?: string;
}

export interface VoiceConfig {
  enabled?: boolean;
  language?: string;
  speed?: number;
  pitch?: number;
  voice?: string;
}

export interface ModelConfig {
  id: string;
  name: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIState {
  selectedModel: ModelConfig | null;
  isProcessing: boolean;
  loading?: boolean;
  error: string | null;
}
