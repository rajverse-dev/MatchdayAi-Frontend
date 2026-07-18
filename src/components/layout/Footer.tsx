import { Activity } from 'lucide-react';

export function Footer() {
  return (
    <footer className="hidden lg:block mt-auto py-4 px-6 border-t border-white/5">
      <div className="flex items-center justify-between text-xs text-navy-500">
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-primary-500" />
          <span>MatchDay AI &copy; 2026 — Smart Stadium Operations Platform</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>System Status:</span>
          <span className="flex items-center gap-1.5 text-success-400">
            <span className="h-1.5 w-1.5 rounded-full bg-success-400 animate-pulse" />
            Operational
          </span>
        </div>
      </div>
    </footer>
  );
}
