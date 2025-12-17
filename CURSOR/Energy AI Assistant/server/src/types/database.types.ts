/**
 * Tipos TypeScript para o banco de dados Supabase
 * 
 * NOTA: Estes tipos devem ser gerados automaticamente usando:
 * npx supabase gen types typescript --project-id <project-id> > src/types/database.types.ts
 * 
 * Por enquanto, definimos uma estrutura base que será substituída
 * quando as migrations estiverem prontas.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      tenants: {
        Row: {
          id: string;
          name: string;
          plan: 'basic' | 'pro' | 'ultra';
          status: 'active' | 'suspended';
          openai_api_key: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['tenants']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['tenants']['Insert']>;
      };
      users: {
        Row: {
          id: string;
          tenant_id: string;
          role: 'MASTER' | 'TENANT_ADMIN' | 'AGENT';
          is_active: boolean;
          last_login: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      // Adicionar outras tabelas conforme necessário
      // Ver docs/schemassupabase.md para schema completo
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

