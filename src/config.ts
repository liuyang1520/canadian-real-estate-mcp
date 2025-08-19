export interface Config {
  rateLimitMs: number;
  maxRetries: number;
  timeout: number;
}

export const defaultConfig: Config = {
  rateLimitMs: 1000,
  maxRetries: 3,
  timeout: 30000,
};

export function getConfig(): Config {
  return defaultConfig;
}
