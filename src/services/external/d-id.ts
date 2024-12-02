import axios from 'axios';

const D_ID_API_URL = 'https://api.d-id.com';
const apiKey = process.env.D_ID_API_KEY;

export const dIdService = {
  // Create a talking video from image and audio
  async createTalkingVideo(imageUrl: string, audioUrl: string) {
    const response = await axios.post(
      `${D_ID_API_URL}/talks`,
      {
        source_url: imageUrl,
        audio_url: audioUrl,
        config: {
          stitch: true,
          result_format: 'mp4',
        },
      },
      {
        headers: {
          Authorization: `Basic ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  },

  // Create an animated video with specific expressions
  async createAnimatedVideo(imageUrl: string, script: Array<{
    expression: string;
    text: string;
    duration: number;
  }>) {
    const response = await axios.post(
      `${D_ID_API_URL}/animations`,
      {
        source_url: imageUrl,
        script,
        config: {
          result_format: 'mp4',
          fluent: true,
          pad_audio: false,
        },
      },
      {
        headers: {
          Authorization: `Basic ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  },

  // Get the status of a video creation job
  async getJobStatus(jobId: string) {
    const response = await axios.get(`${D_ID_API_URL}/jobs/${jobId}`, {
      headers: {
        Authorization: `Basic ${apiKey}`,
      },
    });
    return response.data;
  },

  // Get the result URL of a completed job
  async getResult(jobId: string) {
    const response = await axios.get(`${D_ID_API_URL}/jobs/${jobId}/result`, {
      headers: {
        Authorization: `Basic ${apiKey}`,
      },
    });
    return response.data;
  },
};
