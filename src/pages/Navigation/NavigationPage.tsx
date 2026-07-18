import { useState } from 'react';
import { MapPin, Navigation as NavIcon, Clock, Accessibility, Route } from 'lucide-react';
import { MapPlaceholder } from '../../components/navigation/MapPlaceholder';
import { Card, Button, FullPageSpinner } from '../../components/common';
import { useAsync } from '../../hooks/useAsync';
import { navigationService } from '../../services';
import type { MapPoint } from '../../types';

const pointTypeLabels: Record<MapPoint['type'], string> = {
  gate: 'Gate',
  food: 'Food Court',
  medical: 'Medical',
  restroom: 'Restroom',
  parking: 'Parking',
  seat: 'Your Seat',
  exit: 'Exit',
};

const pointTypeColors: Record<MapPoint['type'], string> = {
  gate: 'text-primary-400 bg-primary-500/10',
  food: 'text-warning-400 bg-warning-500/10',
  medical: 'text-danger-400 bg-danger-500/10',
  restroom: 'text-success-400 bg-success-500/10',
  parking: 'text-navy-300 bg-navy-700/30',
  seat: 'text-primary-300 bg-primary-500/15',
  exit: 'text-danger-300 bg-danger-500/10',
};

export function NavigationPage() {
  const { data: points, loading } = useAsync(() => navigationService.getMapPoints(), []);
  const { data: routes } = useAsync(() => navigationService.getRoutes(), []);
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);

  if (loading || !points) return <FullPageSpinner />;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-white text-2xl lg:text-3xl">Stadium Navigation</h1>
        <p className="text-navy-400 mt-1">Find your way around the stadium with AI-guided routes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card className="p-2 h-[500px]">
            <MapPlaceholder points={points} className="h-full" />
          </Card>
        </div>

        {/* Points list */}
        <div className="space-y-3">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={18} className="text-primary-400" />
              <h3 className="font-display font-semibold text-white">Key Locations</h3>
            </div>
            <div className="space-y-2 max-h-[420px] overflow-y-auto">
              {points.map((point) => (
                <button
                  key={point.id}
                  onClick={() => setSelectedPoint(point)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                    selectedPoint?.id === point.id
                      ? 'bg-primary-500/15 border border-primary-500/20'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${pointTypeColors[point.type]} flex-shrink-0`}>
                    <MapPin size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{point.label}</p>
                    <p className="text-xs text-navy-400">{pointTypeLabels[point.type]}</p>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Routes */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Route size={20} className="text-primary-400" />
          <h2 className="font-display font-semibold text-white text-lg">Suggested Routes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {routes?.map((route) => (
            <Card key={route.id} hover>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-primary-500/10 text-primary-400">
                  <NavIcon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{route.from}</p>
                  <p className="text-xs text-navy-500">to</p>
                  <p className="text-sm font-medium text-white truncate">{route.to}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-navy-300">
                  <MapPin size={14} className="text-primary-400" />
                  {route.distance}m
                </span>
                <span className="flex items-center gap-1.5 text-navy-300">
                  <Clock size={14} className="text-primary-400" />
                  {route.estimatedTime} min
                </span>
                {route.accessibility && (
                  <span className="flex items-center gap-1.5 text-success-400">
                    <Accessibility size={14} />
                    Accessible
                  </span>
                )}
              </div>
              <Button size="sm" fullWidth className="mt-3">
                Navigate
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
