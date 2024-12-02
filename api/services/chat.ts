import { apiClient } from '../config';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  metadata?: {
    voice?: {
      url?: string;
      duration?: number;
    };
    avatar?: {
      url?: string;
      expression?: string;
    };
  };
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  created: string;
  updated: string;
  metadata?: Record<string, any>;
}

export const chatApi = {
  // Conversation management
  getConversations: async () => {
    return apiClient.get<Conversation[]>('/conversations');
  },

  getConversation: async (id: string) => {
    return apiClient.get<Conversation>(`/conversations/${id}`);
  },

  createConversation: async (title?: string) => {
    return apiClient.post<Conversation>('/conversations', { title });
  },

  deleteConversation: async (id: string) => {
    return apiClient.delete(`/conversations/${id}`);
  },

  // Message management
  sendMessage: async (conversationId: string, content: string) => {
    return apiClient.post<Message>(`/conversations/${conversationId}/messages`, {
      content,
      role: 'user',
    });
  },

  getResponse: async (conversationId: string, messageId: string) => {
    return apiClient.get<Message>(`/conversations/${conversationId}/messages/${messageId}/response`);
  },

  // Voice message handling
  sendVoiceMessage: async (conversationId: string, audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    return apiClient.post<Message>(`/conversations/${conversationId}/messages/voice`, formData);
  },

  getVoiceResponse: async (conversationId: string, messageId: string) => {
    return apiClient.get<Message>(`/conversations/${conversationId}/messages/${messageId}/voice-response`);
  },

  // Avatar expressions
  getAvatarExpression: async (conversationId: string, messageId: string) => {
    return apiClient.get(`/conversations/${conversationId}/messages/${messageId}/avatar`);
  },

  // Context and memory management
  updateContext: async (conversationId: string, context: Record<string, any>) => {
    return apiClient.post(`/conversations/${conversationId}/context`, context);
  },

  clearContext: async (conversationId: string) => {
    return apiClient.delete(`/conversations/${conversationId}/context`);
  },

  // Stream management for real-time responses
  streamResponse: async (conversationId: string, messageId: string) => {
    return apiClient.get(`/conversations/${conversationId}/messages/${messageId}/stream`, {
      responseType: 'stream',
    });
  },
};
