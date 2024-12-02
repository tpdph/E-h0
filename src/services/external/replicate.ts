import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export const replicateService = {
  // Generate avatar using Stable Diffusion
  async generateAvatar(prompt: string) {
    const output = await replicate.run(
      "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
      {
        input: {
          prompt,
          negative_prompt: "deformed, distorted, disfigured, poor quality, bad anatomy",
          num_outputs: 1,
          num_inference_steps: 50,
          guidance_scale: 7.5,
        }
      }
    );
    return output as string[];
  },

  // Generate 3D avatar using InstantID
  async generate3DAvatar(imageUrl: string) {
    const output = await replicate.run(
      "instantid/instantid:6af8583c541261472e92b591a0c4f8a0f93fd0925a0d57ad66ecb8e3f5b9b9c9",
      {
        input: {
          image_path: imageUrl,
          prompt: "professional 3D avatar, high quality, detailed",
        }
      }
    );
    return output as string[];
  },

  // Animate avatar using AnimateDiff
  async animateAvatar(imageUrl: string, motion: string) {
    const output = await replicate.run(
      "lucataco/animate-diff:beecf59c4aee8d81bf04f0381033dfa10dc16e845b1e4f99b0d45914b6e3da95",
      {
        input: {
          image: imageUrl,
          motion_template: motion,
          steps: 25,
        }
      }
    );
    return output as string;
  },

  // Generate realistic expressions using EmoticonDiffusion
  async generateExpression(imageUrl: string, expression: string) {
    const output = await replicate.run(
      "lucataco/emoticon-diffusion:e42a3b83326e3449a3fded1b3d229b7ec0da9c4f691c116c5c4c76f94b2a4e72",
      {
        input: {
          image: imageUrl,
          prompt: `${expression} expression, photorealistic`,
          negative_prompt: "deformed, distorted, disfigured, poor quality",
          num_inference_steps: 30,
        }
      }
    );
    return output as string;
  },
};
