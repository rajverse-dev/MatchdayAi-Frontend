import { Menu, Bell, Activity } from 'lucide-react';
import { SearchBar, LanguageSelector, ProfileMenu } from '../common';
import { useNotification } from '../../context/NotificationContext';

interface NavbarProps {
  onMenuClick: () => void;
  onSearch?: (value: string) => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { notifications } = useNotification();

  return (
    <header className="sticky top-0 z-20 h-16 glass-strong border-b border-white/5 flex items-center justify-between px-4 lg:px-6 gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2.5 rounded-xl bg-navy-800/60 border border-white/5 text-navy-200 hover:text-white hover:border-primary-500/30 transition-all lg:hidden"
        >
          <Menu size={20} />
        </button>
        {/* Mobile logo */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
            <Activity size={18} className="text-white" />
          </div>
          <span className="font-display font-bold text-white">MatchDay</span>
        </div>
      </div>

      <div className="hidden md:block flex-1 max-w-md">
        <SearchBar value="" onChange={() => {}} placeholder="Search the stadium..." />
      </div>

      <div className="flex items-center gap-2.5">
        <LanguageSelector />
        <button className="relative p-2.5 rounded-xl bg-navy-800/60 border border-white/5 text-navy-200 hover:text-white hover:border-primary-500/30 transition-all">
          <Bell size={18} />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-danger-500 text-[10px] font-bold text-white flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </button>
        <ProfileMenu />
      </div>
    </header>
  );
}
