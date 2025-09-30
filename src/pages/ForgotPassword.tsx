import React from 'react';
import { Layout } from '@/components/Layout';
import { Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState<string | undefined>();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    if (!email) return setError('Email is required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Enter a valid email');
    setTimeout(() => {
      toast({ title: 'Email sent', description: 'Check your inbox for reset instructions.' });
    }, 600);
  };

  const bgUrl = '/assets/hero-background.png';

  return (
    <Layout>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgUrl})` }} />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#131317]/80 backdrop-blur-xl p-6 shadow-2xl">
            <div className="mb-6 text-center">
              <h1 className="gold-text text-3xl md:text-4xl font-cormorant font-bold">Forgot Password</h1>
              <p className="text-white/70 mt-1 font-inter">Enter your email to reset.</p>
            </div>
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
                    aria-invalid={!!error}
                  />
                </div>
                {error && <p className="text-xs text-red-400">{error}</p>}
              </div>
              <button type="submit" className="bg-gradient-to-r from-yellow-700 to-yellow-500 text-black font-medium rounded-lg py-2.5 hover:brightness-110 w-full">
                Send reset link
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;



