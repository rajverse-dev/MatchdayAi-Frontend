import { type ReactNode } from 'react';
import { Card } from './Card';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ChartCard({ title, subtitle, icon, action, children, className = '' }: ChartCardProps) {
  return (
    <Card className={className}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && <div className="p-2 rounded-xl bg-primary-500/10 text-primary-400">{icon}</div>}
          <div>
            <h3 className="font-display font-semibold text-white text-base">{title}</h3>
            {subtitle && <p className="text-xs text-navy-400 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {action}
      </div>
      <div className="w-full">{children}</div>
    </Card>
  );
}
