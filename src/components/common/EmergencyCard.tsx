import { MapPin, Clock, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import { Card } from '../common';
import { getSeverityColor, formatRelativeTime } from '../../utils';
import type { EmergencyIncident } from '../../types';

interface EmergencyCardProps {
  incident: EmergencyIncident;
}

const typeLabels: Record<EmergencyIncident['type'], string> = {
  medical: 'Medical',
  fire: 'Fire',
  security: 'Security',
  crowd: 'Crowd',
  infrastructure: 'Infrastructure',
};

const typeIcons: Record<EmergencyIncident['type'], string> = {
  medical: '🚑',
  fire: '🔥',
  security: '🛡️',
  crowd: '👥',
  infrastructure: '⚡',
};

export function EmergencyCard({ incident }: EmergencyCardProps) {
  const statusIcon =
    incident.status === 'resolved' ? (
      <CheckCircle size={14} className="text-success-400" />
    ) : incident.status === 'responding' ? (
      <Activity size={14} className="text-primary-400 animate-pulse" />
    ) : (
      <AlertTriangle size={14} className="text-danger-400 animate-pulse" />
    );

  return (
    <Card hover className="animate-fade-in-up">
      <div className="flex items-start gap-3">
        <div className="h-11 w-11 rounded-xl bg-navy-800 flex items-center justify-center text-xl flex-shrink-0">
          {typeIcons[incident.type]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <h3 className="font-display font-semibold text-white text-sm">
                {typeLabels[incident.type]} Incident
              </h3>
              <span
                className={`px-2 py-0.5 rounded-md text-xs font-medium capitalize ${getSeverityColor(incident.severity)}`}
              >
                {incident.severity}
              </span>
            </div>
          </div>
          <p className="text-sm text-navy-300 leading-relaxed mb-2">{incident.description}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-navy-400">
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {incident.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> {formatRelativeTime(incident.reportedAt)}
            </span>
            <span className="flex items-center gap-1">
              {statusIcon}
              <span className="capitalize">{incident.status}</span>
            </span>
            {incident.responder && (
              <span className="flex items-center gap-1 text-primary-400">
                <Activity size={12} /> {incident.responder}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
