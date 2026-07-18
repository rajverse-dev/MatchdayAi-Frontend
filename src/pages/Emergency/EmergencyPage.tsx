import { useState } from 'react';
import { Siren, Phone, MapPin, AlertTriangle } from 'lucide-react';
import { EmergencyCard } from '../../components/common/EmergencyCard';
import { Button, Card, FullPageSpinner } from '../../components/common';
import { useAsync } from '../../hooks/useAsync';
import { emergencyService } from '../../services';
import { useNotification } from '../../context/NotificationContext';
import type { EmergencyIncident } from '../../types';

const emergencyTypes: { value: EmergencyIncident['type']; label: string; icon: string }[] = [
  { value: 'medical', label: 'Medical', icon: '🚑' },
  { value: 'fire', label: 'Fire', icon: '🔥' },
  { value: 'security', label: 'Security', icon: '🛡️' },
  { value: 'crowd', label: 'Crowd Issue', icon: '👥' },
  { value: 'infrastructure', label: 'Infrastructure', icon: '⚡' },
];

export function EmergencyPage() {
  const { data: incidents, loading, refetch } = useAsync(() => emergencyService.getIncidents(), []);
  const { notify } = useNotification();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    type: 'medical' as EmergencyIncident['type'],
    location: '',
    description: '',
    severity: 'medium' as EmergencyIncident['severity'],
  });

  const handleReport = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await emergencyService.reportIncident(form);
      notify({ title: 'Incident Reported', message: 'Emergency services have been notified.', type: 'warning' });
      setShowForm(false);
      setForm({ type: 'medical', location: '', description: '', severity: 'medium' });
      refetch();
    } catch {
      notify({ title: 'Error', message: 'Failed to report incident.', type: 'error' });
    }
  };

  if (loading || !incidents) return <FullPageSpinner />;

  const activeCount = incidents.filter((i) => i.status === 'active').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display font-bold text-white text-2xl lg:text-3xl">Emergency Center</h1>
          <p className="text-navy-400 mt-1">Report and monitor emergency incidents</p>
        </div>
        <div className="flex items-center gap-3">
          {activeCount > 0 && (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-danger-500/10 border border-danger-500/20">
              <span className="h-2 w-2 rounded-full bg-danger-400 animate-pulse" />
              <span className="text-sm text-danger-400 font-medium">{activeCount} Active</span>
            </div>
          )}
          <Button variant="danger" leftIcon={<Siren size={18} />} onClick={() => setShowForm((v) => !v)}>
            Report Incident
          </Button>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <a href="tel:911" className="block">
          <Card hover className="text-center">
            <div className="h-12 w-12 rounded-xl bg-danger-500/10 text-danger-400 flex items-center justify-center mx-auto mb-2">
              <Phone size={22} />
            </div>
            <p className="text-sm font-semibold text-white">Call 911</p>
            <p className="text-xs text-navy-400">Emergency Services</p>
          </Card>
        </a>
        <Card hover className="text-center">
          <div className="h-12 w-12 rounded-xl bg-primary-500/10 text-primary-400 flex items-center justify-center mx-auto mb-2">
            <MapPin size={22} />
          </div>
          <p className="text-sm font-semibold text-white">Nearest Exit</p>
          <p className="text-xs text-navy-400">Exit C - 50m away</p>
        </Card>
        <Card hover className="text-center">
          <div className="h-12 w-12 rounded-xl bg-success-500/10 text-success-400 flex items-center justify-center mx-auto mb-2">
            <AlertTriangle size={22} />
          </div>
          <p className="text-sm font-semibold text-white">Medical Center</p>
          <p className="text-xs text-navy-400">Main concourse</p>
        </Card>
        <Card hover className="text-center">
          <div className="h-12 w-12 rounded-xl bg-warning-500/10 text-warning-400 flex items-center justify-center mx-auto mb-2">
            <Siren size={22} />
          </div>
          <p className="text-sm font-semibold text-white">Safety Info</p>
          <p className="text-xs text-navy-400">View guidelines</p>
        </Card>
      </div>

      {/* Report form */}
      {showForm && (
        <Card className="animate-fade-in-up">
          <h3 className="font-display font-semibold text-white mb-4">Report New Incident</h3>
          <form onSubmit={handleReport} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-300 mb-2">Incident Type</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {emergencyTypes.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, type: t.value }))}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
                      form.type === t.value
                        ? 'bg-primary-500/15 border-primary-500/30 text-primary-400'
                        : 'glass border-white/5 text-navy-300 hover:text-white'
                    }`}
                  >
                    <span className="text-xl">{t.icon}</span>
                    <span className="text-xs font-medium">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy-300 mb-2">Location</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                  required
                  placeholder="Section B, Row 14"
                  className="w-full px-4 py-2.5 rounded-xl glass text-sm text-white placeholder-navy-500 focus:outline-none focus:border-primary-500/40"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-300 mb-2">Severity</label>
                <select
                  value={form.severity}
                  onChange={(e) => setForm((f) => ({ ...f, severity: e.target.value as EmergencyIncident['severity'] }))}
                  className="w-full px-4 py-2.5 rounded-xl glass text-sm text-white focus:outline-none focus:border-primary-500/40"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-300 mb-2">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                required
                rows={3}
                placeholder="Describe the incident..."
                className="w-full px-4 py-2.5 rounded-xl glass text-sm text-white placeholder-navy-500 focus:outline-none focus:border-primary-500/40 resize-none"
              />
            </div>
            <div className="flex gap-3">
              <Button type="submit" variant="danger">Submit Report</Button>
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        </Card>
      )}

      {/* Incidents */}
      <div>
        <h2 className="font-display font-semibold text-white text-lg mb-4">Active Incidents</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {incidents.map((incident) => (
            <EmergencyCard key={incident.id} incident={incident} />
          ))}
        </div>
      </div>
    </div>
  );
}
