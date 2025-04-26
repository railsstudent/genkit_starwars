import { safetySettings } from './safety-settings.constant';

export const responseConfig = {
  maxOutputTokens: 2048,
  temperature: 0.2,
  topP: 1,
  topK: 10,
  safetySettings,
};
