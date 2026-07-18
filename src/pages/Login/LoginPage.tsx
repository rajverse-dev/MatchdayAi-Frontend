import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { AuthLayout } from './AuthLayout';
import { Button } from '../../components/common';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

export function LoginPage() {
  const { login } = useAuth();
  const { notify } = useNotification();
  const navigate = useNavigate();

  const [email, setEmail] = useState('alex.morgan@matchday.ai');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

 const handleSubmit = async (e: React.FormEvent) => {

  e.preventDefault();

  setLoading(true);

  setError("");

  try {

    await login(email, password);

    notify({
      title: "Welcome Back!",
      message: "Login Successful",
      type: "success",
    });

    const role = localStorage.getItem("matchday_role");

    if (role === "ROLE_ADMIN") {

      navigate("/admin/dashboard");

    } else if (role === "ROLE_OPERATOR") {

      navigate("/operator/dashboard");

    } else {

      navigate("/dashboard");

    }

  } catch (error) {

    setError("Invalid email or password");

  } finally {

    setLoading(false);

  }

};  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to access the operations dashboard.">
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="px-4 py-3 rounded-xl bg-danger-500/10 border border-danger-500/20 text-sm text-danger-400 animate-fade-in">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-navy-300 mb-2">Email Address</label>
          <div className="relative">
            <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@stadium.com"
              className="w-full pl-11 pr-4 py-3 rounded-xl glass text-sm text-white placeholder-navy-500 focus:outline-none focus:border-primary-500/40 transition-all"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-navy-300">Password</label>
            <button type="button" className="text-xs text-primary-400 hover:text-primary-300">
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full pl-11 pr-11 py-3 rounded-xl glass text-sm text-white placeholder-navy-500 focus:outline-none focus:border-primary-500/40 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2.5 cursor-pointer">
          <input type="checkbox" className="h-4 w-4 rounded border-navy-600 bg-navy-800 text-primary-600 focus:ring-primary-500/30" defaultChecked />
          <span className="text-sm text-navy-300">Keep me signed in</span>
        </label>

        <Button type="submit" fullWidth size="lg" loading={loading} rightIcon={<ArrowRight size={18} />}>
          Sign In
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-navy-950 text-xs text-navy-500">or</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" size="md" fullWidth>
            Demo Admin
          </Button>
          <Button variant="secondary" size="md" fullWidth>
            Demo Visitor
          </Button>
        </div>

        <p className="text-center text-sm text-navy-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-400 font-medium hover:text-primary-300">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
