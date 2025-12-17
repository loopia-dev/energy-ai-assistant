import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'error';
  label?: string;
  className?: string;
}

const statusConfig = {
  active: {
    label: 'Ativo',
    className: 'bg-success/10 text-success border-success/20',
  },
  inactive: {
    label: 'Inativo',
    className: 'bg-muted text-muted-foreground border-muted-foreground/20',
  },
  pending: {
    label: 'Pendente',
    className: 'bg-warning/10 text-warning border-warning/20',
  },
  error: {
    label: 'Erro',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        config.className,
        className
      )}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {label || config.label}
    </span>
  );
}
