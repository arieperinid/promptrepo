/**
 * Prompt kind enumeration
 */
export const KIND = {
  prompt: 'prompt',
  system: 'system',
  tool: 'tool',
} as const;

export type Kind = typeof KIND[keyof typeof KIND];

export const KINDS = Object.values(KIND);
