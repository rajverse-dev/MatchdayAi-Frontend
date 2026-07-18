import { Clock, Users, Star } from 'lucide-react';
import { Card } from '../common';
import { getStatusColor } from '../../utils';
import type { QueueInfo } from '../../types';

interface QueueCardProps {
  queue: QueueInfo;
}

const categoryIcons: Record<QueueInfo['category'], string> = {
  food: '🍔',
  restroom: '🚻',
  merchandise: '🛍️',
  ticket: '🎫',
};

export function QueueCard({ queue }: QueueCardProps) {
  const isClosed = queue.status === 'closed';

  return (
    <Card hover className="animate-fade-in-up">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-navy-800 flex items-center justify-center text-xl">
            {categoryIcons[queue.category]}
          </div>
          <div>
            <h3 className="font-display font-semibold text-white text-sm">{queue.stallName}</h3>
            <p className="text-xs text-navy-400">{queue.location}</p>
          </div>
        </div>
        <span
          className={`px-2.5 py-1 rounded-lg text-xs font-medium border capitalize ${getStatusColor(queue.status)}`}
        >
          {queue.status}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="h-2 rounded-full bg-navy-800 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              queue.status === 'high'
                ? 'bg-gradient-to-r from-warning-500 to-danger-500'
                : queue.status === 'medium'
                ? 'bg-gradient-to-r from-primary-500 to-primary-400'
                : 'bg-gradient-to-r from-success-500 to-success-400'
            }`}
            style={{ width: `${queue.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1.5 text-navy-300">
          <Clock size={14} className="text-primary-400" />
          <span>{isClosed ? 'Closed' : `${queue.waitingTime} min`}</span>
        </div>
        <div className="flex items-center gap-1.5 text-navy-300">
          <Users size={14} className="text-primary-400" />
          <span>{queue.peopleInLine} in line</span>
        </div>
        {queue.rating > 0 && (
          <div className="flex items-center gap-1 text-navy-300">
            <Star size={14} className="text-warning-400 fill-warning-400" />
            <span>{queue.rating}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
