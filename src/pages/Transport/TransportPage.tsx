import { Bus, Train, Car, ParkingCircle, TramFront, Navigation } from 'lucide-react';
import { Card, FullPageSpinner } from '../../components/common';
import { useAsync } from '../../hooks/useAsync';
import { transportService } from '../../services';
import { getStatusColor } from '../../utils';
import type { TransportOption } from '../../types';

const typeConfig: Record<TransportOption['type'], { icon: typeof Bus; color: string }> = {
  metro: { icon: Train, color: 'text-primary-400 bg-primary-500/10' },
  bus: { icon: Bus, color: 'text-success-400 bg-success-500/10' },
  parking: { icon: ParkingCircle, color: 'text-warning-400 bg-warning-500/10' },
  rideshare: { icon: Car, color: 'text-primary-300 bg-primary-500/10' },
  shuttle: { icon: TramFront, color: 'text-success-300 bg-success-500/10' },
};

export function TransportPage() {
  const { data: options, loading } = useAsync(() => transportService.getOptions(), []);

  if (loading || !options) return <FullPageSpinner />;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-white text-2xl lg:text-3xl">Transportation</h1>
        <p className="text-navy-400 mt-1">Live transit options and parking availability</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {options.map((option) => {
          const config = typeConfig[option.type];
          const Icon = config.icon;

          return (
            <Card key={option.id} hover className="animate-fade-in-up">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${config.color}`}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white text-sm">{option.label}</h3>
                    {option.route && <p className="text-xs text-navy-400">{option.route}</p>}
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border capitalize ${getStatusColor(option.status)}`}>
                  {option.status}
                </span>
              </div>

              {/* Availability bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-navy-400">Availability</span>
                  <span className="text-sm font-semibold text-white">{option.availability}%</span>
                </div>
                <div className="h-2 rounded-full bg-navy-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      option.availability > 70
                        ? 'bg-gradient-to-r from-success-500 to-success-400'
                        : option.availability > 40
                        ? 'bg-gradient-to-r from-warning-500 to-warning-400'
                        : 'bg-gradient-to-r from-danger-500 to-danger-400'
                    }`}
                    style={{ width: `${option.availability}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                {option.nextArrival > 0 ? (
                  <span className="flex items-center gap-1.5 text-navy-300">
                    <Navigation size={14} className="text-primary-400" />
                    Next arrival: {option.nextArrival} min
                  </span>
                ) : (
                  <span className="text-navy-400 text-xs">Available now</span>
                )}
                {option.capacity > 0 && (
                  <span className="text-xs text-navy-400">Cap: {option.capacity}</span>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
