import { Users, Gauge, Clock, Siren, Activity, SlidersHorizontal, AlertTriangle, CheckCircle, Eye } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { StatisticCard, ChartCard, Card, FullPageSpinner, NotificationCard } from '../../components/common';
import { AIRecommendationCard } from '../../components/dashboard/AIRecommendationCard';
import { useAsync } from '../../hooks/useAsync';
import { operationsService } from '../../services';
import type { IncidentTimelineItem } from '../../types';

const chartTooltipStyle = {
  backgroundColor: '#0f1a3a',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  fontSize: '12px',
  color: '#fff',
};

const incidentStatusIcon: Record<IncidentTimelineItem['status'], typeof CheckCircle> = {
  resolved: CheckCircle,
  active: AlertTriangle,
  monitoring: Eye,
};

const incidentStatusColor: Record<IncidentTimelineItem['status'], string> = {
  resolved: 'text-success-400 bg-success-500/10',
  active: 'text-danger-400 bg-danger-500/10',
  monitoring: 'text-warning-400 bg-warning-500/10',
};

export function OperationsPage() {
  const { data, loading, error } = useAsync(() => operationsService.getOperations(), []);

  if (loading) return <FullPageSpinner />;
  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <p className="text-danger-400">Failed to load operations data.</p>
      </div>
    );
  }

  const { liveStats, crowdTrend, incidents, alerts, aiRecommendations, heatmap } = data;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display font-bold text-white text-2xl lg:text-3xl">Operations Dashboard</h1>
          <p className="text-navy-400 mt-1">Comprehensive stadium operations control center</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass">
          <SlidersHorizontal size={16} className="text-primary-400" />
          <span className="text-sm text-navy-200">Command Center</span>
        </div>
      </div>

      {/* Live stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <StatisticCard title="Visitors" value={liveStats.visitors} trend={liveStats.visitorsTrend} icon={<Users size={22} />} color="primary" />
        <StatisticCard title="Crowd Density" value={liveStats.crowdDensity} format="percent" trend={liveStats.crowdDensityTrend} icon={<Gauge size={22} />} color="warning" />
        <StatisticCard title="Avg Queue" value={liveStats.averageQueueTime} unit="min" icon={<Clock size={22} />} color="success" />
        <StatisticCard title="Alerts" value={liveStats.emergencyAlerts} icon={<Siren size={22} />} color="danger" />
      </div>

      {/* Crowd trend + heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Live Crowd Density" subtitle="Real-time monitoring" icon={<Activity size={18} />}>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={crowdTrend}>
              <defs>
                <linearGradient id="opsCrowd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2f7bff" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#2f7bff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Area type="monotone" dataKey="value" stroke="#2f7bff" strokeWidth={2} fill="url(#opsCrowd)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Activity size={18} className="text-primary-400" />
            <h3 className="font-display font-semibold text-white">Crowd Heatmap</h3>
          </div>
          <div className="relative h-[260px] rounded-xl bg-navy-900 overflow-hidden pitch-grid">
            {heatmap.map((point, i) => {
              const left = 10 + (i % 3) * 28;
              const top = 15 + Math.floor(i / 3) * 30;
              return (
                <div
                  key={i}
                  className="absolute rounded-full blur-3xl transition-all duration-700"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    width: '140px',
                    height: '140px',
                    background:
                      point.intensity > 0.85
                        ? 'rgba(239, 68, 68, 0.5)'
                        : point.intensity > 0.65
                        ? 'rgba(245, 158, 11, 0.4)'
                        : point.intensity > 0.4
                        ? 'rgba(47, 123, 255, 0.3)'
                        : 'rgba(16, 185, 129, 0.3)',
                  }}
                />
              );
            })}
            <div className="absolute bottom-4 right-4 glass px-3 py-2 rounded-xl">
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success-400" /> Safe</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-warning-400" /> Busy</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-danger-400" /> Critical</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Incident timeline */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Clock size={18} className="text-primary-400" />
          <h3 className="font-display font-semibold text-white">Incident Timeline</h3>
        </div>
        <div className="space-y-3">
          {incidents.map((incident) => {
            const StatusIcon = incidentStatusIcon[incident.status];
            return (
              <div key={incident.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div className={`p-2 rounded-lg ${incidentStatusColor[incident.status]} flex-shrink-0`}>
                  <StatusIcon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold text-white">{incident.title}</h4>
                    <span className="text-xs text-navy-500 flex-shrink-0">{incident.time}</span>
                  </div>
                  <p className="text-sm text-navy-300 mt-0.5">{incident.description}</p>
                  <span className="inline-block mt-1.5 px-2 py-0.5 rounded-md text-xs bg-navy-800 text-navy-300 capitalize">
                    {incident.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* AI Recommendations */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Activity size={20} className="text-primary-400" />
          <h2 className="font-display font-semibold text-white text-lg">AI Recommendations</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {aiRecommendations.map((rec) => (
            <AIRecommendationCard key={rec.id} recommendation={rec} />
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={20} className="text-warning-400" />
          <h2 className="font-display font-semibold text-white text-lg">Active Alerts</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {alerts.map((alert) => (
            <NotificationCard key={alert.id} notification={alert} />
          ))}
        </div>
      </div>
    </div>
  );
}
