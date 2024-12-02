import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
});

export const openaiService = {
  // Chat completion with GPT-4
  async generateChatResponse(messages: { role: 'user' | 'assistant' | 'system'; content: string }[]) {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    });
    return completion.choices[0].message;
  },

  // Text to speech using OpenAI's TTS
  async generateSpeech(text: string, voice: string = 'alloy') {
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice,
      input: text,
    });
    return mp3;
  },

  // Speech to text using Whisper
  async transcribeAudio(audioBlob: Blob) {
    const transcription = await openai.audio.transcriptions.create({
      file: audioBlob as any,
      model: 'whisper-1',
    });
    return transcription.text;
  },

  // Image generation using DALL-E 3
  async generateImage(prompt: string) {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
    });
    return response.data[0].url;
  },
};
