import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../common';
import { getDensityColor, getStatusColor } from '../../utils';
import type { CrowdZone } from '../../types';

interface CrowdCardProps {
  zone: CrowdZone;
}

export function CrowdCard({ zone }: CrowdCardProps) {
  const densityColor = getDensityColor(zone.density);

  return (
    <Card hover className="animate-fade-in-up">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-display font-semibold text-white text-sm">{zone.zone}</h3>
          <p className="text-xs text-navy-400 mt-0.5">Capacity: {zone.capacity}</p>
        </div>
        <span
          className={`px-2.5 py-1 rounded-lg text-xs font-medium border capitalize ${getStatusColor(zone.status)}`}
        >
          {zone.status}
        </span>
      </div>

      {/* Density bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-navy-400">Density</span>
          <span className={`text-lg font-display font-bold ${densityColor}`}>{zone.density}%</span>
        </div>
        <div className="h-2.5 rounded-full bg-navy-800 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              zone.density >= 85
                ? 'bg-gradient-to-r from-warning-500 to-danger-500'
                : zone.density >= 65
                ? 'bg-gradient-to-r from-primary-500 to-warning-500'
                : zone.density >= 40
                ? 'bg-gradient-to-r from-success-500 to-primary-500'
                : 'bg-gradient-to-r from-success-600 to-success-400'
            }`}
            style={{ width: `${zone.density}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs">
        {zone.trend > 0 ? (
          <TrendingUp size={14} className="text-danger-400" />
        ) : (
          <TrendingDown size={14} className="text-success-400" />
        )}
        <span className={zone.trend > 0 ? 'text-danger-400' : 'text-success-400'}>
          {Math.abs(zone.trend)}%
        </span>
        <span className="text-navy-500">trend</span>
      </div>
    </Card>
  );
}
