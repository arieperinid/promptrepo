import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getEnv } from "./env";

/**
 * Create Supabase client with anonymous key (for client-side usage)
 * Safe to use in browsers and client components
 */
export function createClientAnon(): SupabaseClient {
    const env = getEnv();

    return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
        },
    });
}

/**
 * Create Supabase client with service role key (for server-side usage)
 * Has elevated permissions - use only on server
 */
export function createClientService(): SupabaseClient {
    const env = getEnv();

    return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}

/**
 * Type definitions for database tables
 * TODO: Generate these from actual database schema
 */
export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string;
                    email: string;
                    name: string;
                    role: "user" | "admin";
                    theme_preference: "light" | "dark" | "system";
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "id" | "created_at" | "updated_at">;
                Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
            };
            projects: {
                Row: {
                    id: string;
                    name: string;
                    user_id: string;
                    is_public: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database["public"]["Tables"]["projects"]["Row"], "id" | "created_at" | "updated_at">;
                Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
            };
        };
    };
}
