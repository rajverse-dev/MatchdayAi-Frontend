import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, glow = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`glass-card p-5 ${hover ? 'transition-all duration-300 hover:border-primary-500/30 hover:shadow-glass' : ''} ${glow ? 'stat-glow' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function CardHeader({ title, subtitle, icon, action }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="p-2 rounded-xl bg-primary-500/10 text-primary-400">{icon}</div>
        )}
        <div>
          <h3 className="font-display font-semibold text-white text-base">{title}</h3>
          {subtitle && <p className="text-xs text-navy-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}
