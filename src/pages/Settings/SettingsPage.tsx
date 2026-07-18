import { useState } from 'react';
import { Bell, Globe, Moon, Shield, Volume2, Smartphone, Save } from 'lucide-react';
import { Card, Button, LanguageSelector } from '../../components/common';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

interface ToggleProps {
  enabled: boolean;
  onChange: (v: boolean) => void;
}

function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`h-6 w-11 rounded-full relative transition-colors ${enabled ? 'bg-primary-600' : 'bg-navy-700'}`}
    >
      <div
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${enabled ? 'right-0.5' : 'left-0.5'}`}
      />
    </button>
  );
}

export function SettingsPage() {
  const { user, updateUser } = useAuth();
  const { notify } = useNotification();

  const [notifications, setNotifications] = useState(user?.notificationsEnabled ?? true);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);

  const handleSave = () => {
    updateUser({ notificationsEnabled: notifications });
    notify({ title: 'Settings Saved', message: 'Your preferences have been updated.', type: 'success' });
  };

  const settingsGroups = [
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Push Notifications', desc: 'Receive general match updates', value: notifications, onChange: setNotifications },
        { label: 'Emergency Alerts', desc: 'Critical safety notifications', value: emergencyAlerts, onChange: setEmergencyAlerts },
        { label: 'Sound Effects', desc: 'Play sound on new notifications', value: soundEnabled, onChange: setSoundEnabled },
      ],
    },
    {
      title: 'App Preferences',
      icon: Smartphone,
      items: [
        { label: 'Auto-Update Data', desc: 'Refresh data automatically', value: autoUpdate, onChange: setAutoUpdate },
      ],
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display font-bold text-white text-2xl lg:text-3xl">Settings</h1>
          <p className="text-navy-400 mt-1">Customize your MatchDay AI experience</p>
        </div>
        <Button leftIcon={<Save size={16} />} onClick={handleSave}>
          Save Changes
        </Button>
      </div>

      {/* Language */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Globe size={18} className="text-primary-400" />
          <h3 className="font-display font-semibold text-white">Language & Region</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white">Display Language</p>
            <p className="text-xs text-navy-400 mt-0.5">Choose your preferred language</p>
          </div>
          <LanguageSelector />
        </div>
      </Card>

      {/* Settings groups */}
      {settingsGroups.map((group) => (
        <Card key={group.title}>
          <div className="flex items-center gap-2 mb-4">
            <group.icon size={18} className="text-primary-400" />
            <h3 className="font-display font-semibold text-white">{group.title}</h3>
          </div>
          <div className="space-y-4">
            {group.items.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white">{item.label}</p>
                  <p className="text-xs text-navy-400 mt-0.5">{item.desc}</p>
                </div>
                <Toggle enabled={item.value} onChange={item.onChange} />
              </div>
            ))}
          </div>
        </Card>
      ))}

      {/* Appearance */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Moon size={18} className="text-primary-400" />
          <h3 className="font-display font-semibold text-white">Appearance</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white">Dark Mode</p>
            <p className="text-xs text-navy-400 mt-0.5">Easy on the eyes, perfect for match nights</p>
          </div>
          <Toggle enabled={true} onChange={() => {}} />
        </div>
      </Card>

      {/* Privacy */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Shield size={18} className="text-primary-400" />
          <h3 className="font-display font-semibold text-white">Privacy & Security</h3>
        </div>
        <div className="space-y-3">
          <button className="w-full text-left p-3 rounded-xl hover:bg-white/5 transition-colors">
            <p className="text-sm text-white">Change Password</p>
            <p className="text-xs text-navy-400 mt-0.5">Update your account password</p>
          </button>
          <button className="w-full text-left p-3 rounded-xl hover:bg-white/5 transition-colors">
            <p className="text-sm text-white">Two-Factor Authentication</p>
            <p className="text-xs text-navy-400 mt-0.5">Add an extra layer of security</p>
          </button>
          <button className="w-full text-left p-3 rounded-xl hover:bg-white/5 transition-colors">
            <p className="text-sm text-white">Data & Privacy</p>
            <p className="text-xs text-navy-400 mt-0.5">Manage your data preferences</p>
          </button>
        </div>
      </Card>

      {/* Sound */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Volume2 size={18} className="text-primary-400" />
          <h3 className="font-display font-semibold text-white">Audio</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white">Notification Sound</p>
            <p className="text-xs text-navy-400 mt-0.5">Play sound for incoming alerts</p>
          </div>
          <Toggle enabled={soundEnabled} onChange={setSoundEnabled} />
        </div>
      </Card>
    </div>
  );
}
