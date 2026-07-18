import { Users, Activity, AlertTriangle } from 'lucide-react';
import { CrowdCard } from '../../components/crowd/CrowdCard';
import { StatisticCard, FullPageSpinner, Card } from '../../components/common';
import { useAsync } from '../../hooks/useAsync';
import { crowdService } from '../../services';

export function CrowdPage() {
  const { data: zones, loading } = useAsync(() => crowdService.getZones(), []);

  if (loading || !zones) return <FullPageSpinner />;

  const avgDensity = Math.round(zones.reduce((sum, z) => sum + z.density, 0) / zones.length);
  const criticalZones = zones.filter((z) => z.status === 'critical' || z.status === 'busy').length;
  const safeZones = zones.filter((z) => z.status === 'safe').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-white text-2xl lg:text-3xl">Crowd Monitor</h1>
        <p className="text-navy-400 mt-1">Live crowd density across all stadium zones</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatisticCard title="Average Density" value={avgDensity} format="percent" icon={<Users size={22} />} color="warning" />
        <StatisticCard title="Critical Zones" value={criticalZones} icon={<AlertTriangle size={22} />} color="danger" />
        <StatisticCard title="Safe Zones" value={safeZones} icon={<Activity size={22} />} color="success" />
      </div>

      {/* Zone cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {zones.map((zone) => (
          <CrowdCard key={zone.id} zone={zone} />
        ))}
      </div>

      {/* Heatmap placeholder */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Activity size={18} className="text-primary-400" />
          <h3 className="font-display font-semibold text-white">Crowd Heatmap</h3>
        </div>
        <div className="relative h-64 rounded-xl bg-navy-900 overflow-hidden pitch-grid">
          {zones.map((zone, i) => {
            const left = 10 + (i % 4) * 23;
            const top = 15 + Math.floor(i / 4) * 35;
            const intensity = zone.density / 100;
            return (
              <div
                key={zone.id}
                className="absolute rounded-full blur-2xl transition-all duration-700"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  width: '120px',
                  height: '120px',
                  background:
                    intensity > 0.85
                      ? 'rgba(239, 68, 68, 0.5)'
                      : intensity > 0.65
                      ? 'rgba(245, 158, 11, 0.4)'
                      : intensity > 0.4
                      ? 'rgba(47, 123, 255, 0.3)'
                      : 'rgba(16, 185, 129, 0.3)',
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-white/80">{zone.zone}</span>
                </div>
              </div>
            );
          })}
          <div className="absolute bottom-4 right-4 glass px-3 py-2 rounded-xl">
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success-400" /> Safe</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary-400" /> Moderate</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-warning-400" /> Busy</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-danger-400" /> Critical</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
