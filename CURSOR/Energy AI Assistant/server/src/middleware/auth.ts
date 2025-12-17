/**
 * Middleware de autenticação
 * 
 * Valida tokens JWT do Supabase e adiciona informações
 * do utilizador ao request.
 * 
 * IMPORTANTE: Este middleware valida mas não autoriza.
 * A autorização (roles, tenant_id) deve ser feita nas rotas.
 */

import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../config/supabase';

// Estender o tipo Request do Express
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
        tenant_id?: string;
        role?: string;
      };
    }
  }
}

/**
 * Middleware para validar autenticação via Supabase
 * 
 * Extrai o token do header Authorization e valida com Supabase Auth.
 * Adiciona informações do utilizador ao request.
 */
export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Token de autenticação não fornecido' });
      return;
    }

    const token = authHeader.substring(7);

    // Validar token com Supabase
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      res.status(401).json({ error: 'Token inválido ou expirado' });
      return;
    }

    // Buscar informações adicionais do utilizador (tenant_id, role)
    // TODO: Implementar quando a tabela users estiver pronta
    const { data: userData } = await supabaseAdmin
      .from('users')
      .select('tenant_id, role')
      .eq('id', user.id)
      .single();

    // Adicionar informações ao request
    req.user = {
      id: user.id,
      email: user.email,
      tenant_id: userData?.tenant_id,
      role: userData?.role
    };

    next();
  } catch (error) {
    console.error('Erro na autenticação:', error);
    res.status(500).json({ error: 'Erro ao processar autenticação' });
  }
}

/**
 * Middleware para verificar se o utilizador tem um role específico
 * 
 * @param allowedRoles - Array de roles permitidos
 */
export function requireRole(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Não autenticado' });
      return;
    }

    if (!req.user.role || !allowedRoles.includes(req.user.role)) {
      res.status(403).json({ error: 'Acesso negado. Permissões insuficientes.' });
      return;
    }

    next();
  };
}

/**
 * Middleware para verificar se o utilizador pertence a um tenant específico
 * ou é MASTER (que tem acesso a todos)
 */
export function requireTenantAccess() {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Não autenticado' });
      return;
    }

    // MASTER tem acesso a todos os tenants
    if (req.user.role === 'MASTER') {
      next();
      return;
    }

    // Outros roles precisam de tenant_id
    if (!req.user.tenant_id) {
      res.status(403).json({ error: 'Acesso negado. Tenant não identificado.' });
      return;
    }

    next();
  };
}

