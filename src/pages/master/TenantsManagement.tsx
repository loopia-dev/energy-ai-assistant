import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/ui/status-badge';
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Power,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const tenants = [
  {
    id: '1',
    name: 'EDP Comercial',
    plan: 'ultra',
    status: 'active',
    users: 45,
    mrr: 197,
    apiConfigured: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Galp Energia',
    plan: 'pro',
    status: 'active',
    users: 12,
    mrr: 97,
    apiConfigured: true,
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    name: 'Endesa Portugal',
    plan: 'pro',
    status: 'active',
    users: 8,
    mrr: 97,
    apiConfigured: true,
    createdAt: '2024-03-10',
  },
  {
    id: '4',
    name: 'Iberdrola PT',
    plan: 'basic',
    status: 'inactive',
    users: 1,
    mrr: 47,
    apiConfigured: false,
    createdAt: '2024-04-05',
  },
  {
    id: '5',
    name: 'Goldenergy',
    plan: 'pro',
    status: 'active',
    users: 5,
    mrr: 97,
    apiConfigured: true,
    createdAt: '2024-04-18',
  },
  {
    id: '6',
    name: 'Luzboa',
    plan: 'basic',
    status: 'active',
    users: 1,
    mrr: 47,
    apiConfigured: true,
    createdAt: '2024-05-02',
  },
];

const planLabels: Record<string, { label: string; className: string }> = {
  basic: { label: 'Basic', className: 'bg-muted text-muted-foreground' },
  pro: { label: 'Pro', className: 'bg-primary/10 text-primary' },
  ultra: { label: 'Ultra', className: 'bg-success/10 text-success' },
};

export default function TenantsManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTenants = tenants.filter((tenant) =>
    tenant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout
      title="Gestão de Tenants"
      description="Gerir todas as empresas registadas na plataforma"
    >
      {/* Actions Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Pesquisar tenants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Tenant
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Empresa
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Plano
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Utilizadores
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  MRR
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  API OpenAI
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-muted/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-semibold text-primary">
                        {tenant.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {tenant.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Desde {new Date(tenant.createdAt).toLocaleDateString('pt-PT')}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        planLabels[tenant.plan].className
                      }`}
                    >
                      {planLabels[tenant.plan].label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge
                      status={tenant.status as 'active' | 'inactive'}
                    />
                  </td>
                  <td className="px-6 py-4 text-foreground">{tenant.users}</td>
                  <td className="px-6 py-4 font-medium text-foreground">
                    €{tenant.mrr}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge
                      status={tenant.apiConfigured ? 'active' : 'error'}
                      label={tenant.apiConfigured ? 'Configurada' : 'Não configurada'}
                    />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Dashboard
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Power className="mr-2 h-4 w-4" />
                          {tenant.status === 'active' ? 'Desativar' : 'Ativar'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
