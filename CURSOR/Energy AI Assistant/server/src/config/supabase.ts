/**
 * Configuração do Supabase Client
 * 
 * Este módulo inicializa e exporta o cliente Supabase
 * para uso em toda a aplicação backend.
 * 
 * IMPORTANTE: Usa a service role key apenas no backend.
 * Nunca exponha esta key no frontend.
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';

// Validação das variáveis de ambiente
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('SUPABASE_URL não está definida nas variáveis de ambiente');
}

if (!supabaseServiceRoleKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY não está definida nas variáveis de ambiente');
}

/**
 * Cliente Supabase com service role key
 * 
 * Este cliente tem privilégios administrativos e bypassa RLS.
 * Use apenas no backend para operações que requerem acesso total.
 * 
 * Para operações com contexto de utilizador, use o cliente
 * criado a partir do token JWT do utilizador.
 */
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseServiceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

/**
 * Cria um cliente Supabase para um utilizador específico
 * 
 * @param accessToken - JWT token do utilizador autenticado
 * @returns Cliente Supabase com contexto do utilizador (respeita RLS)
 */
export function createUserClient(accessToken: string) {
  return createClient<Database>(
    supabaseUrl,
    process.env.SUPABASE_ANON_KEY || '',
    {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
}

export default supabaseAdmin;

