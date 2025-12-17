import { ReactNode } from 'react';
import { AppSidebar } from './AppSidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export function DashboardLayout({ children, title, description }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="ml-64 min-h-screen">
        <div className="p-8">
          {(title || description) && (
            <div className="mb-8">
              {title && (
                <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
              )}
              {description && (
                <p className="mt-1 text-muted-foreground">{description}</p>
              )}
            </div>
          )}
          <div className="animate-fade-in">{children}</div>
        </div>
      </main>
    </div>
  );
}
