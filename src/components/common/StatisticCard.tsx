import { type ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './Card';
import { formatNumber, getTrendColor } from '../../utils';

interface StatisticCardProps {
  title: string;
  value: number;
  unit?: string;
  trend?: number;
  icon: ReactNode;
  color?: 'primary' | 'success' | 'warning' | 'danger';
  format?: 'number' | 'percent' | 'plain';
}

const colorMap = {
  primary: 'bg-primary-500/10 text-primary-400',
  success: 'bg-success-500/10 text-success-400',
  warning: 'bg-warning-500/10 text-warning-400',
  danger: 'bg-danger-500/10 text-danger-400',
};

export function StatisticCard({
  title,
  value,
  unit,
  trend,
  icon,
  color = 'primary',
  format = 'number',
}: StatisticCardProps) {
  const displayValue =
    format === 'percent' ? `${value}%` : format === 'plain' ? `${value}` : formatNumber(value);

  return (
    <Card hover className="animate-fade-in-up">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium text-navy-400 uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-display font-bold text-white mt-2">
            {displayValue}
            {unit && <span className="text-sm text-navy-400 ml-1">{unit}</span>}
          </p>
        </div>
        <div className={`p-3 rounded-xl ${colorMap[color]} flex-shrink-0`}>{icon}</div>
      </div>
      {trend !== undefined && (
        <div className="flex items-center gap-1.5 mt-3">
          <span className={`flex items-center gap-1 text-xs font-medium ${getTrendColor(trend)}`}>
            {trend > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {Math.abs(trend)}%
          </span>
          <span className="text-xs text-navy-500">vs last hour</span>
        </div>
      )}
    </Card>
  );
}
