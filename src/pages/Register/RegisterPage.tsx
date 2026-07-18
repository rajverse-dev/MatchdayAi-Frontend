import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { AuthLayout } from '../Login/AuthLayout';
import { Button } from '../../components/common';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

export function RegisterPage() {
  const { register } = useAuth();
  const { notify } = useNotification();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password, phone);
      notify({ title: 'Account created!', message: 'Welcome to MatchDay AI.', type: 'success' });
      navigate('/dashboard');
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create your account" subtitle="Join the smart stadium operations platform.">
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="px-4 py-3 rounded-xl bg-danger-500/10 border border-danger-500/20 text-sm text-danger-400 animate-fade-in">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-navy-300 mb-2">Full Name</label>
          <div className="relative">
            <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
              className="w-full pl-11 pr-4 py-3 rounded-xl glass text-sm text-white placeholder-navy-500 focus:outline-none focus:border-primary-500/40 transition-all"
            />
          </div>
        </div>

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
          <label className="block text-sm font-medium text-navy-300 mb-2">Phone (optional)</label>
          <div className="relative">
            <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 555 0142"
              className="w-full pl-11 pr-4 py-3 rounded-xl glass text-sm text-white placeholder-navy-500 focus:outline-none focus:border-primary-500/40 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-300 mb-2">Password</label>
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

        <div>
          <label className="block text-sm font-medium text-navy-300 mb-2">Confirm Password</label>
          <div className="relative">
            <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full pl-11 pr-4 py-3 rounded-xl glass text-sm text-white placeholder-navy-500 focus:outline-none focus:border-primary-500/40 transition-all"
            />
          </div>
        </div>

        <label className="flex items-start gap-2.5 cursor-pointer">
          <input type="checkbox" required className="h-4 w-4 rounded border-navy-600 bg-navy-800 text-primary-600 focus:ring-primary-500/30 mt-0.5" />
          <span className="text-sm text-navy-300">
            I agree to the <span className="text-primary-400">Terms of Service</span> and{' '}
            <span className="text-primary-400">Privacy Policy</span>
          </span>
        </label>

        <Button type="submit" fullWidth size="lg" loading={loading} rightIcon={<ArrowRight size={18} />}>
          Create Account
        </Button>

        <p className="text-center text-sm text-navy-400">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-400 font-medium hover:text-primary-300">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
