import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { chatApi, Message, Conversation } from '../api/services/chat';
import { settingsApi, Settings } from '../api/services/settings';
import { assistantApi, AssistantConfig } from '../api/services/assistant';

interface AppState {
  // Chat state
  conversations: Conversation[];
  currentConversation: Conversation | null;
  loading: boolean;
  error: string | null;

  // Settings state
  settings: Settings | null;
  settingsLoading: boolean;
  settingsError: string | null;

  // Assistant state
  assistantConfig: AssistantConfig | null;
  assistantLoading: boolean;
  assistantError: string | null;

  // Actions
  initializeApp: () => Promise<void>;
  
  // Chat actions
  loadConversations: () => Promise<void>;
  createConversation: (title?: string) => Promise<void>;
  selectConversation: (id: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  sendVoiceMessage: (audioBlob: Blob) => Promise<void>;
  deleteConversation: (id: string) => Promise<void>;
  
  // Settings actions
  loadSettings: () => Promise<void>;
  updateSettings: (settings: Partial<Settings>) => Promise<void>;
  resetSettings: () => Promise<void>;
  
  // Assistant actions
  loadAssistantConfig: () => Promise<void>;
  updateAssistantConfig: (config: Partial<AssistantConfig>) => Promise<void>;
  trainVoice: (recordings: { url: string; blob: Blob }[]) => Promise<void>;
  trainAvatar: (photos: File[]) => Promise<void>;
  updateShape: (config: AssistantConfig['shape']) => Promise<void>;
}

export const useStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        conversations: [],
        currentConversation: null,
        loading: false,
        error: null,
        settings: null,
        settingsLoading: false,
        settingsError: null,
        assistantConfig: null,
        assistantLoading: false,
        assistantError: null,

        // Initialize app
        initializeApp: async () => {
          try {
            await Promise.all([
              get().loadConversations(),
              get().loadSettings(),
              get().loadAssistantConfig(),
            ]);
          } catch (error) {
            set({ error: 'Failed to initialize app' });
          }
        },

        // Chat actions
        loadConversations: async () => {
          set({ loading: true, error: null });
          try {
            const response = await chatApi.getConversations();
            set({ conversations: response.data, loading: false });
          } catch (error) {
            set({ error: 'Failed to load conversations', loading: false });
          }
        },

        createConversation: async (title) => {
          set({ loading: true, error: null });
          try {
            const response = await chatApi.createConversation(title);
            set((state) => ({
              conversations: [...state.conversations, response.data],
              currentConversation: response.data,
              loading: false,
            }));
          } catch (error) {
            set({ error: 'Failed to create conversation', loading: false });
          }
        },

        selectConversation: async (id) => {
          set({ loading: true, error: null });
          try {
            const response = await chatApi.getConversation(id);
            set({ currentConversation: response.data, loading: false });
          } catch (error) {
            set({ error: 'Failed to load conversation', loading: false });
          }
        },

        sendMessage: async (content) => {
          const { currentConversation } = get();
          if (!currentConversation) return;

          set({ loading: true, error: null });
          try {
            const response = await chatApi.sendMessage(currentConversation.id, content);
            const assistantResponse = await chatApi.getResponse(currentConversation.id, response.data.id);
            
            set((state) => ({
              currentConversation: state.currentConversation ? {
                ...state.currentConversation,
                messages: [...state.currentConversation.messages, response.data, assistantResponse.data],
              } : null,
              loading: false,
            }));
          } catch (error) {
            set({ error: 'Failed to send message', loading: false });
          }
        },

        sendVoiceMessage: async (audioBlob) => {
          const { currentConversation } = get();
          if (!currentConversation) return;

          set({ loading: true, error: null });
          try {
            const response = await chatApi.sendVoiceMessage(currentConversation.id, audioBlob);
            const assistantResponse = await chatApi.getVoiceResponse(currentConversation.id, response.data.id);
            
            set((state) => ({
              currentConversation: state.currentConversation ? {
                ...state.currentConversation,
                messages: [...state.currentConversation.messages, response.data, assistantResponse.data],
              } : null,
              loading: false,
            }));
          } catch (error) {
            set({ error: 'Failed to send voice message', loading: false });
          }
        },

        deleteConversation: async (id) => {
          set({ loading: true, error: null });
          try {
            await chatApi.deleteConversation(id);
            set((state) => ({
              conversations: state.conversations.filter((conv) => conv.id !== id),
              currentConversation: state.currentConversation?.id === id ? null : state.currentConversation,
              loading: false,
            }));
          } catch (error) {
            set({ error: 'Failed to delete conversation', loading: false });
          }
        },

        // Settings actions
        loadSettings: async () => {
          set({ settingsLoading: true, settingsError: null });
          try {
            const response = await settingsApi.getSettings();
            set({ settings: response.data, settingsLoading: false });
          } catch (error) {
            set({ settingsError: 'Failed to load settings', settingsLoading: false });
          }
        },

        updateSettings: async (settings) => {
          set({ settingsLoading: true, settingsError: null });
          try {
            const response = await settingsApi.updateSettings(settings);
            set({ settings: response.data, settingsLoading: false });
          } catch (error) {
            set({ settingsError: 'Failed to update settings', settingsLoading: false });
          }
        },

        resetSettings: async () => {
          set({ settingsLoading: true, settingsError: null });
          try {
            await settingsApi.resetToDefault();
            const response = await settingsApi.getSettings();
            set({ settings: response.data, settingsLoading: false });
          } catch (error) {
            set({ settingsError: 'Failed to reset settings', settingsLoading: false });
          }
        },

        // Assistant actions
        loadAssistantConfig: async () => {
          set({ assistantLoading: true, assistantError: null });
          try {
            const response = await assistantApi.getConfiguration();
            set({ assistantConfig: response.data, assistantLoading: false });
          } catch (error) {
            set({ assistantError: 'Failed to load assistant configuration', assistantLoading: false });
          }
        },

        updateAssistantConfig: async (config) => {
          set({ assistantLoading: true, assistantError: null });
          try {
            const response = await assistantApi.updateConfiguration(config);
            set({ assistantConfig: response.data, assistantLoading: false });
          } catch (error) {
            set({ assistantError: 'Failed to update assistant configuration', assistantLoading: false });
          }
        },

        trainVoice: async (recordings) => {
          set({ assistantLoading: true, assistantError: null });
          try {
            await assistantApi.trainVoice(recordings);
            const response = await assistantApi.getConfiguration();
            set({ assistantConfig: response.data, assistantLoading: false });
          } catch (error) {
            set({ assistantError: 'Failed to train voice', assistantLoading: false });
          }
        },

        trainAvatar: async (photos) => {
          set({ assistantLoading: true, assistantError: null });
          try {
            await assistantApi.trainAvatar(photos);
            const response = await assistantApi.getConfiguration();
            set({ assistantConfig: response.data, assistantLoading: false });
          } catch (error) {
            set({ assistantError: 'Failed to train avatar', assistantLoading: false });
          }
        },

        updateShape: async (config) => {
          set({ assistantLoading: true, assistantError: null });
          try {
            await assistantApi.updateShape(config);
            const response = await assistantApi.getConfiguration();
            set({ assistantConfig: response.data, assistantLoading: false });
          } catch (error) {
            set({ assistantError: 'Failed to update shape', assistantLoading: false });
          }
        },
      }),
      {
        name: 'app-storage',
        partialize: (state) => ({
          settings: state.settings,
          assistantConfig: state.assistantConfig,
        }),
      }
    )
  )
);
