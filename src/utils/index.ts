import type { Language } from '../types';

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US').format(n);
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function getTrendColor(trend: number): string {
  if (trend > 0) return 'text-success-400';
  if (trend < 0) return 'text-danger-400';
  return 'text-navy-400';
}

export function getDensityColor(density: number): string {
  if (density >= 85) return 'text-danger-400';
  if (density >= 65) return 'text-warning-400';
  if (density >= 40) return 'text-primary-400';
  return 'text-success-400';
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'safe':
    case 'low':
    case 'available':
    case 'resolved':
      return 'text-success-400 bg-success-500/10 border-success-500/20';
    case 'moderate':
    case 'medium':
    case 'limited':
    case 'monitoring':
    case 'responding':
      return 'text-warning-400 bg-warning-500/10 border-warning-500/20';
    case 'busy':
    case 'high':
    case 'active':
      return 'text-primary-400 bg-primary-500/10 border-primary-500/20';
    case 'critical':
    case 'full':
    case 'closed':
      return 'text-danger-400 bg-danger-500/10 border-danger-500/20';
    default:
      return 'text-navy-400 bg-navy-700/30 border-navy-600/30';
  }
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'low':
      return 'text-success-400 bg-success-500/10';
    case 'medium':
      return 'text-warning-400 bg-warning-500/10';
    case 'high':
      return 'text-primary-400 bg-primary-500/10';
    case 'critical':
      return 'text-danger-400 bg-danger-500/10';
    default:
      return 'text-navy-400 bg-navy-700/30';
  }
}

export const languageNames: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  ar: 'العربية',
  de: 'Deutsch',
};

export const languageFlags: Record<Language, string> = {
  en: '🇬🇧',
  es: '🇪🇸',
  fr: '🇫🇷',
  ar: '🇸🇦',
  de: '🇩🇪',
};
