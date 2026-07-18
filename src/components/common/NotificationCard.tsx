import { type ReactNode } from 'react';
import { Card } from './Card';
import { formatRelativeTime } from '../../utils';
import type { Announcement } from '../../types';

const typeStyles: Record<Announcement['type'], { bg: string; text: string; dot: string }> = {
  info: { bg: 'bg-primary-500/10', text: 'text-primary-400', dot: 'bg-primary-400' },
  success: { bg: 'bg-success-500/10', text: 'text-success-400', dot: 'bg-success-400' },
  warning: { bg: 'bg-warning-500/10', text: 'text-warning-400', dot: 'bg-warning-400' },
  danger: { bg: 'bg-danger-500/10', text: 'text-danger-400', dot: 'bg-danger-400' },
};

interface NotificationCardProps {
  notification: Announcement;
  icon?: ReactNode;
}

export function NotificationCard({ notification, icon }: NotificationCardProps) {
  const style = typeStyles[notification.type];

  return (
    <Card hover className="animate-fade-in">
      <div className="flex items-start gap-3">
        <div className={`p-2.5 rounded-xl ${style.bg} ${style.text} flex-shrink-0`}>
          {icon ?? <span className={`block h-2 w-2 rounded-full ${style.dot}`} />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-semibold text-white truncate">{notification.title}</h4>
            <span className="text-xs text-navy-500 flex-shrink-0">
              {formatRelativeTime(notification.timestamp)}
            </span>
          </div>
          <p className="text-sm text-navy-300 mt-1 leading-relaxed">{notification.message}</p>
        </div>
      </div>
    </Card>
  );
}
