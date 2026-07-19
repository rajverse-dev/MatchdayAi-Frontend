import { type ReactNode } from 'react';
import { Activity, Shield, Zap, Globe } from 'lucide-react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const features = [
  { icon: Shield, title: 'Real-time Security', desc: 'AI-powered crowd monitoring & threat detection' },
  { icon: Zap, title: 'Smart Operations', desc: 'Automated queue management & resource allocation' },
  { icon: Globe, title: 'Multi-language', desc: 'Support for 5 languages with AI translation' },
];

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <main className="min-h-screen gradient-bg flex">
      {/* Left panel - branding */}
      <section aria-label="Branding" className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 pitch-grid relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-success-500/10 rounded-full blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-glow">
              <Activity size={26} className="text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-white text-2xl">MatchDay AI</h1>
              <p className="text-sm text-primary-400">Smart Stadium Operations</p>
            </div>
          </div>
        </div>

        <div className="relative space-y-8">
          <div>
            <h2 className="font-display font-bold text-white text-4xl leading-tight">
              The future of
              <br />
              <span className="gradient-text">stadium operations</span>
            </h2>
            <p className="text-navy-300 text-lg mt-4 max-w-md">
              AI-powered platform for real-time crowd management, navigation, and emergency response.
            </p>
          </div>

          <div className="space-y-4">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="p-3 rounded-xl glass text-primary-400 flex-shrink-0">
                  <f.icon size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{f.title}</h3>
                  <p className="text-sm text-navy-400">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-xs text-navy-500">
          &copy; 2026 MatchDay AI. All rights reserved.
        </div>
      </section>

      {/* Right panel - form */}
      <section aria-label="Authentication Form" className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-glow">
              <Activity size={24} className="text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-white text-xl">MatchDay AI</h1>
              <p className="text-xs text-primary-400">Smart Stadium Operations</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="font-display font-bold text-white text-2xl">{title}</h2>
            <p className="text-navy-400 mt-1.5">{subtitle}</p>
          </div>

          {children}
        </div>
      </section>
    </main>
  );
}
