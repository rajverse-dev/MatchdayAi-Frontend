import { Link } from 'react-router-dom';
import { Home, Activity } from 'lucide-react';
import { Button } from '../../components/common';

export function NotFoundPage() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-glow mx-auto mb-8">
          <Activity size={40} className="text-white" />
        </div>
        <h1 className="font-display font-bold text-white text-7xl mb-4">404</h1>
        <h2 className="font-display font-semibold text-white text-xl mb-2">Page Not Found</h2>
        <p className="text-navy-400 mb-8">
          The page you're looking for seems to have left the stadium. Let's get you back to the game.
        </p>
        <Link to="/dashboard">
          <Button size="lg" leftIcon={<Home size={18} />}>
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
