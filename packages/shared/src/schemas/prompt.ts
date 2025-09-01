import { z } from "zod";
import { KIND, type Kind } from "../enums/kind";
import { LANGUAGE, type Language, DEFAULT_LANGUAGE } from "../enums/language";

/**
 * Prompt schema matching the database structure
 */
export const PromptSchema = z.object({
  id: z.string().uuid(),
  segment_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  body: z.string().min(1),
  language: z.enum([LANGUAGE.en, LANGUAGE['pt-BR']]).default(DEFAULT_LANGUAGE),
  kind: z.enum([KIND.prompt, KIND.system, KIND.tool]).default(KIND.prompt),
  position: z.number().int().min(0).default(0),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
}).strict();

export type Prompt = z.infer<typeof PromptSchema>;

// Helper types for prompt with known kind
export type PromptWithKind<T extends Kind> = Prompt & { kind: T };
export type UserPrompt = PromptWithKind<typeof KIND.prompt>;
export type SystemPrompt = PromptWithKind<typeof KIND.system>;
export type ToolPrompt = PromptWithKind<typeof KIND.tool>;

// Helper types for prompt with known language
export type PromptWithLanguage<T extends Language> = Prompt & { language: T };
export type EnglishPrompt = PromptWithLanguage<typeof LANGUAGE.en>;
export type PortuguesePrompt = PromptWithLanguage<typeof LANGUAGE['pt-BR']>;
