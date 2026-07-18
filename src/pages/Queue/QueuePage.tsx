import { useState } from 'react';
import { Clock } from 'lucide-react';
import { QueueCard } from '../../components/queue/QueueCard';
import { SearchBar, FullPageSpinner, Card } from '../../components/common';
import { useAsync } from '../../hooks/useAsync';
import { queueService } from '../../services';
import type { QueueInfo } from '../../types';

const categoryFilters: { value: QueueInfo['category'] | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'food', label: 'Food' },
  { value: 'restroom', label: 'Restrooms' },
  { value: 'merchandise', label: 'Merchandise' },
  { value: 'ticket', label: 'Tickets' },
];

export function QueuePage() {
  const { data: queues, loading } = useAsync(() => queueService.getQueues(), []);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<QueueInfo['category'] | 'all'>('all');

  if (loading || !queues) return <FullPageSpinner />;

  const filtered = queues.filter((q) => {
    const matchesSearch = q.stallName.toLowerCase().includes(search.toLowerCase()) ||
      q.location.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || q.category === filter;
    return matchesSearch && matchesFilter;
  });

  const avgWait = queues.filter((q) => q.status !== 'closed').reduce((sum, q) => sum + q.waitingTime, 0) /
    queues.filter((q) => q.status !== 'closed').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display font-bold text-white text-2xl lg:text-3xl">Queue Status</h1>
          <p className="text-navy-400 mt-1">Real-time wait times across all stadium facilities</p>
        </div>
        <Card className="flex items-center gap-3">
          <Clock size={20} className="text-primary-400" />
          <div>
            <p className="text-xs text-navy-400">Average Wait</p>
            <p className="text-lg font-display font-bold text-white">{Math.round(avgWait)} min</p>
          </div>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search stalls..." className="flex-1" />
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categoryFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                filter === f.value
                  ? 'bg-primary-600 text-white'
                  : 'glass text-navy-300 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((queue) => (
          <QueueCard key={queue.id} queue={queue} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-navy-400">No queues found matching your search.</p>
        </div>
      )}
    </div>
  );
}
