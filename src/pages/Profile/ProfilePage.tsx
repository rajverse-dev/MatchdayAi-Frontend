import { Mail, Phone, Globe, Bell, Shield, Calendar, MapPin, Edit3 } from 'lucide-react';
import { Card, Button } from '../../components/common';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { languageNames } from '../../utils';

export function ProfilePage() {
  const { user } = useAuth();
  const { language } = useLanguage();

  if (!user) return null;

  const stats = [
    { label: 'Matches Attended', value: '24' },
    { label: 'Member Since', value: '2024' },
    { label: 'Loyalty Points', value: '1,420' },
    { label: 'Tier', value: 'Gold' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-white text-2xl lg:text-3xl">Profile</h1>
        <p className="text-navy-400 mt-1">Manage your account information</p>
      </div>

      {/* Profile header */}
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative">
            <img
              src={user.avatar ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=1a5cf0&color=fff`}
              alt={user.name}
              className="h-24 w-24 rounded-2xl object-cover border-2 border-primary-500/30"
            />
            <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-success-500 border-2 border-navy-900 flex items-center justify-center">
              <span className="h-2 w-2 rounded-full bg-white" />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="font-display font-bold text-white text-2xl">{user.name}</h2>
            <p className="text-navy-400 mt-1">{user.email}</p>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="px-3 py-1 rounded-lg bg-primary-500/10 text-primary-400 text-xs font-medium capitalize">
                {user.role}
              </span>
              <span className="px-3 py-1 rounded-lg bg-success-500/10 text-success-400 text-xs font-medium">
                Verified
              </span>
              <span className="px-3 py-1 rounded-lg bg-warning-500/10 text-warning-400 text-xs font-medium">
                Gold Member
              </span>
            </div>
          </div>
          <Button variant="secondary" leftIcon={<Edit3 size={16} />}>
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="text-center">
            <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
            <p className="text-xs text-navy-400 mt-1">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <h3 className="font-display font-semibold text-white mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary-500/10 text-primary-400">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs text-navy-400">Email</p>
                <p className="text-sm text-white">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-success-500/10 text-success-400">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs text-navy-400">Phone</p>
                <p className="text-sm text-white">{user.phone ?? 'Not provided'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-warning-500/10 text-warning-400">
                <Globe size={18} />
              </div>
              <div>
                <p className="text-xs text-navy-400">Language</p>
                <p className="text-sm text-white">{languageNames[language]}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-navy-700/30 text-navy-300">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs text-navy-400">Location</p>
                <p className="text-sm text-white">Emirates Stadium, London</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-display font-semibold text-white mb-4">Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary-500/10 text-primary-400">
                  <Bell size={18} />
                </div>
                <div>
                  <p className="text-sm text-white">Push Notifications</p>
                  <p className="text-xs text-navy-400">Receive match updates</p>
                </div>
              </div>
              <div className="h-6 w-11 rounded-full bg-primary-600 relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-success-500/10 text-success-400">
                  <Shield size={18} />
                </div>
                <div>
                  <p className="text-sm text-white">Emergency Alerts</p>
                  <p className="text-xs text-navy-400">Critical notifications</p>
                </div>
              </div>
              <div className="h-6 w-11 rounded-full bg-primary-600 relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-warning-500/10 text-warning-400">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-sm text-white">Match Reminders</p>
                  <p className="text-xs text-navy-400">1 hour before kick-off</p>
                </div>
              </div>
              <div className="h-6 w-11 rounded-full bg-navy-700 relative cursor-pointer">
                <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-navy-400" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
