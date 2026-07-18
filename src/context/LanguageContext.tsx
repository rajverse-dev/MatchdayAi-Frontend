import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Language } from '../types';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    dashboard: 'Dashboard',
    chat: 'AI Chat',
    navigation: 'Navigation',
    queue: 'Queue Status',
    crowd: 'Crowd Monitor',
    emergency: 'Emergency',
    transport: 'Transportation',
    profile: 'Profile',
    settings: 'Settings',
    operations: 'Operations',
    logout: 'Logout',
    search: 'Search...',
  },
  es: {
    dashboard: 'Panel',
    chat: 'Chat IA',
    navigation: 'Navegación',
    queue: 'Colas',
    crowd: 'Multitudes',
    emergency: 'Emergencia',
    transport: 'Transporte',
    profile: 'Perfil',
    settings: 'Ajustes',
    operations: 'Operaciones',
    logout: 'Cerrar sesión',
    search: 'Buscar...',
  },
  fr: {
    dashboard: 'Tableau de bord',
    chat: 'Chat IA',
    navigation: 'Navigation',
    queue: 'File d\'attente',
    crowd: 'Foule',
    emergency: 'Urgence',
    transport: 'Transport',
    profile: 'Profil',
    settings: 'Paramètres',
    operations: 'Opérations',
    logout: 'Déconnexion',
    search: 'Rechercher...',
  },
  ar: {
    dashboard: 'لوحة التحكم',
    chat: 'الدردشة الذكية',
    navigation: 'التنقل',
    queue: 'الطوابير',
    crowd: 'الحشود',
    emergency: 'الطوارئ',
    transport: 'النقل',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    operations: 'العمليات',
    logout: 'تسجيل الخروج',
    search: 'بحث...',
  },
  de: {
    dashboard: 'Dashboard',
    chat: 'KI-Chat',
    navigation: 'Navigation',
    queue: 'Warteschlange',
    crowd: 'Menge',
    emergency: 'Notfall',
    transport: 'Transport',
    profile: 'Profil',
    settings: 'Einstellungen',
    operations: 'Betrieb',
    logout: 'Abmelden',
    search: 'Suchen...',
  },
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => translations[language][key] ?? translations.en[key] ?? key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
