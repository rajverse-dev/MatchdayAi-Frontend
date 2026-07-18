import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function ProfileMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 p-1 pr-3 rounded-xl bg-navy-800/60 border border-white/5 hover:border-primary-500/30 transition-all"
      >
        <img
          src={user.avatar ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=1a5cf0&color=fff`}
          alt={user.name}
          className="h-8 w-8 rounded-lg object-cover"
        />
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-white leading-tight">{user.name}</p>
          <p className="text-xs text-navy-400 capitalize">{user.role}</p>
        </div>
        <ChevronDown size={14} className="text-navy-400" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-56 glass-strong rounded-xl shadow-glass overflow-hidden z-50 animate-fade-in">
            <div className="p-4 border-b border-white/5">
              <p className="text-sm font-semibold text-white">{user.name}</p>
              <p className="text-xs text-navy-400 truncate">{user.email}</p>
            </div>
            <div className="p-1.5">
              <button
                onClick={() => {
                  navigate('/profile');
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-navy-200 hover:bg-white/5 transition-colors"
              >
                <User size={16} /> Profile
              </button>
              <button
                onClick={() => {
                  navigate('/settings');
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-navy-200 hover:bg-white/5 transition-colors"
              >
                <Settings size={16} /> Settings
              </button>
            </div>
            <div className="p-1.5 border-t border-white/5">
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-danger-400 hover:bg-danger-500/10 transition-colors"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
