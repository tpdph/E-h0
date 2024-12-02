import axios from 'axios';

const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1';
const apiKey = process.env.ELEVENLABS_API_KEY;

export const elevenLabsService = {
  // Get available voices
  async getVoices() {
    const response = await axios.get(`${ELEVENLABS_API_URL}/voices`, {
      headers: { 'xi-api-key': apiKey },
    });
    return response.data.voices;
  },

  // Generate speech from text
  async generateSpeech(text: string, voiceId: string) {
    const response = await axios.post(
      `${ELEVENLABS_API_URL}/text-to-speech/${voiceId}`,
      { text },
      {
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );
    return response.data;
  },

  // Add new voice
  async addVoice(name: string, files: Blob[]) {
    const formData = new FormData();
    formData.append('name', name);
    files.forEach((file, index) => {
      formData.append(`files`, file, `sample_${index}.mp3`);
    });

    const response = await axios.post(`${ELEVENLABS_API_URL}/voices/add`, formData, {
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Edit existing voice
  async editVoice(voiceId: string, name: string, files?: Blob[]) {
    const formData = new FormData();
    formData.append('name', name);
    if (files) {
      files.forEach((file, index) => {
        formData.append(`files`, file, `sample_${index}.mp3`);
      });
    }

    const response = await axios.post(`${ELEVENLABS_API_URL}/voices/${voiceId}/edit`, formData, {
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete voice
  async deleteVoice(voiceId: string) {
    const response = await axios.delete(`${ELEVENLABS_API_URL}/voices/${voiceId}`, {
      headers: { 'xi-api-key': apiKey },
    });
    return response.data;
  },
};
