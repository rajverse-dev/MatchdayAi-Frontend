import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Navigation as NavIcon,
  Clock,
  Users,
  Siren,
  Bus,
  SlidersHorizontal,
} from 'lucide-react';

const items = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Home' },
  { to: '/chat', icon: MessageSquare, label: 'AI' },
  { to: '/navigation', icon: NavIcon, label: 'Map' },
  { to: '/queue', icon: Clock, label: 'Queue' },
  { to: '/crowd', icon: Users, label: 'Crowd' },
  { to: '/emergency', icon: Siren, label: 'SOS' },
  { to: '/transport', icon: Bus, label: 'Transit' },
  { to: '/operations', icon: SlidersHorizontal, label: 'Ops' },
];

export function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 glass-strong border-t border-white/5">
      <div className="flex items-center justify-around px-1 py-1.5 overflow-x-auto no-scrollbar">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-lg transition-all min-w-[52px] ${
                isActive ? 'text-primary-400' : 'text-navy-400'
              }`
            }
          >
            <item.icon size={20} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
