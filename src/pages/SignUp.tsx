import React from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, User as UserIcon } from 'lucide-react';
import PasswordInput from '@/components/ui/PasswordInput';
import { useToast } from '@/hooks/use-toast';
import bgUrl from '@/assets/hero-background.png'; // NEW


const strengthLabel = (pwd: string) => {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 1) return { label: 'Weak', color: 'bg-red-500' };
  if (score === 2) return { label: 'Medium', color: 'bg-yellow-500' };
  return { label: 'Strong', color: 'bg-green-500' };
};

export default function SignUp() {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [agree, setAgree] = React.useState(false);
  const [errors, setErrors] = React.useState<{ name?: string; email?: string; password?: string; agree?: string; form?: string }>({});

  const validate = () => {
    const next: typeof errors = {};
    if (!name) next.name = 'Full name is required';
    if (!email) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email';
    if (!password) next.password = 'Password is required';
    else if (password.length < 8) next.password = 'Minimum 8 characters';
    if (!agree) next.agree = 'You must agree to the Terms';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;
    try {
      await register(name, email, password);
      toast({ title: 'Account created', description: 'Welcome to New Kalyani Jewellers.' });
      navigate('/profile');
    } catch {
      setErrors({ form: 'Could not create account. Try again.' });
    }
  };

  //const bgUrl = '/assets/hero-background.png';
  const strength = strengthLabel(password);

  return (
    <Layout>
      <div className="relative min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgUrl})` }}
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#131317]/80 backdrop-blur-xl p-6 shadow-2xl">
            <div className="mb-6 text-center">
              <h1 className="gold-text text-3xl md:text-4xl font-cormorant font-bold">Create Account</h1>
              <p className="text-white/70 mt-1 font-inter">Join New Kalyani Jewellers.</p>
            </div>

            {errors.form && (
              <div className="mb-4 text-sm text-red-400" role="alert">{errors.form}</div>
            )}

            <form onSubmit={onSubmit} className="space-y-4" noValidate>
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-sm text-white/80 font-medium">Full Name</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
                    <UserIcon className="h-4 w-4" />
                  </span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg bg-black/40 border border-white/10 pl-10 pr-3 px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-yellow-600"
                    placeholder="Your full name"
                    aria-invalid={!!errors.name}
                  />
                </div>
                {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
              </div>

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

              <div>
                <PasswordInput
                  id="password"
                  label="Password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  error={errors.password}
                  autoComplete="new-password"
                />
                {password && (
                  <div className="mt-2">
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className={`h-full ${strength.color}`} style={{ width: `${Math.min(100, password.length * 8)}%` }} />
                    </div>
                    <p className="mt-1 text-xs text-white/70">Strength: {strength.label}</p>
                  </div>
                )}
              </div>

              <label className="flex items-start gap-3 text-sm text-white/80">
                <input
                  type="checkbox"
                  className="mt-0.5 rounded border-white/20 bg-black/40 text-yellow-600 focus:ring-2 focus:ring-yellow-600"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <span>
                  I agree to the{' '}
                  <a className="underline hover:gold-text" href="#" onClick={(e) => e.preventDefault()}>Terms</a>
                  {' '}and{' '}
                  <a className="underline hover:gold-text" href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>.
                </span>
              </label>
              {errors.agree && <p className="-mt-2 text-xs text-red-400">{errors.agree}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-yellow-700 to-yellow-500 text-black font-medium rounded-lg py-2.5 hover:brightness-110 disabled:opacity-60 w-full"
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-white/70">
              Already have an account?{' '}
              <Link to="/login" className="hover:gold-text">Log in</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
