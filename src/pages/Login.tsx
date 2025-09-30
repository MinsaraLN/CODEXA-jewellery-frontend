import React from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, LogOut } from 'lucide-react';
import PasswordInput from '@/components/ui/PasswordInput';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const { login, isLoading, logout, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(true);
  const [errors, setErrors] = React.useState<{ email?: string; password?: string; form?: string }>({});

  const validate = () => {
    const nextErrors: { email?: string; password?: string } = {};
    if (!email) nextErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Enter a valid email';
    if (!password) nextErrors.password = 'Password is required';
    else if (password.length < 8) nextErrors.password = 'Minimum 8 characters';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;
    try {
      try { localStorage.setItem('auth_storage', remember ? 'local' : 'session'); } catch {}
      await login(email, password);
      toast({ title: 'Welcome back', description: 'You are now signed in.' });
      navigate('/profile');
    } catch {
      setErrors({ form: 'Invalid credentials. Please try again.' });
    }
  };

  // Put your earrings image in public/ as `earrings.jpg` (or update the path below)
  const bgUrl = '/earrings.jpg';

  return (
    <Layout>
      <div className="relative min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgUrl})` }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#131317]/80 backdrop-blur-xl p-6 shadow-2xl">
            <div className="mb-6 text-center">
              <h1 className="gold-text text-3xl md:text-4xl font-cormorant font-bold">Login</h1>
              <p className="text-white/70 mt-1 font-inter">Welcome back.</p>
            </div>

            {user && (
              <div className="mb-6 rounded-lg border border-white/10 bg-black/40 p-4 text-white/80">
                <p className="text-sm mb-3">You are currently signed in. Logout to start fresh.</p>
                <button
                  type="button"
                  onClick={() => {
                    try { localStorage.removeItem('auth_storage'); } catch {}
                    logout();
                    setEmail('');
                    setPassword('');
                    toast({ title: 'Signed out', description: 'Your session has been cleared.' });
                  }}
                  className="inline-flex items-center gap-2 rounded-md bg-red-600/90 hover:bg-red-600 text-white px-4 py-2 text-sm"
                >
                  <LogOut className="h-4 w-4" /> Logout and reset
                </button>
              </div>
            )}

            {errors.form && (
              <div className="mb-4 text-sm text-red-400" role="alert">{errors.form}</div>
            )}

            <form onSubmit={onSubmit} className="space-y-4" noValidate>
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm text-white/80 font-medium">Email</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg bg-black/40 border border-white/10 pl-10 pr-3 px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-yellow-600"
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                  />
                </div>
                {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
              </div>

              <PasswordInput
                id="password"
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                error={errors.password}
                autoComplete="current-password"
              />

              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-sm text-white/80">
                  <input
                    type="checkbox"
                    className="rounded border-white/20 bg-black/40 text-yellow-600 focus:ring-2 focus:ring-yellow-600"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" className="text-sm text-white/70 hover:gold-text">Forgot password?</Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-yellow-700 to-yellow-500 text-black font-medium rounded-lg py-2.5 hover:brightness-110 disabled:opacity-60 w-full"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-white/70">
              Don’t have an account?{' '}
              <Link to="/signup" className="hover:gold-text">Create account</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
