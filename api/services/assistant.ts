import { apiClient } from '../config';

export interface VoiceData {
  url: string;
  blob: Blob;
}

export interface AssistantConfig {
  voice?: {
    model: string;
    settings: Record<string, any>;
  };
  avatar?: {
    model: string;
    settings: Record<string, any>;
  };
  shape?: {
    model: string;
    settings: Record<string, any>;
  };
}

export const assistantApi = {
  // Voice training endpoints
  uploadVoiceRecording: async (recording: VoiceData) => {
    const formData = new FormData();
    formData.append('recording', recording.blob);
    return apiClient.post('/assistant/voice/upload', formData);
  },

  getVoiceModels: async () => {
    return apiClient.get('/assistant/voice/models');
  },

  trainVoice: async (recordings: VoiceData[]) => {
    const formData = new FormData();
    recordings.forEach((rec, index) => {
      formData.append(`recording${index}`, rec.blob);
    });
    return apiClient.post('/assistant/voice/train', formData);
  },

  // Avatar training endpoints
  uploadAvatarPhotos: async (photos: File[]) => {
    const formData = new FormData();
    photos.forEach((photo, index) => {
      formData.append(`photo${index}`, photo);
    });
    return apiClient.post('/assistant/avatar/upload', formData);
  },

  getAvatarModels: async () => {
    return apiClient.get('/assistant/avatar/models');
  },

  trainAvatar: async (photos: File[]) => {
    const formData = new FormData();
    photos.forEach((photo, index) => {
      formData.append(`photo${index}`, photo);
    });
    return apiClient.post('/assistant/avatar/train', formData);
  },

  // Shape training endpoints
  getShapeModels: async () => {
    return apiClient.get('/assistant/shape/models');
  },

  updateShape: async (config: AssistantConfig['shape']) => {
    return apiClient.post('/assistant/shape/update', config);
  },

  // General assistant endpoints
  getConfiguration: async () => {
    return apiClient.get('/assistant/config');
  },

  updateConfiguration: async (config: AssistantConfig) => {
    return apiClient.post('/assistant/config/update', config);
  },

  // Model endpoints
  getAvailableModels: async () => {
    return apiClient.get('/assistant/models');
  },

  selectModel: async (modelId: string) => {
    return apiClient.post('/assistant/models/select', { modelId });
  },
};
