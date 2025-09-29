import React from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label = 'Password',
  error,
  className = '',
  id,
  ...props
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const inputId = id || 'password-input';

  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="block text-sm text-white/80 font-medium">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
          <Lock className="h-4 w-4" />
        </span>
        <input
          id={inputId}
          type={isVisible ? 'text' : 'password'}
          className={
            `w-full rounded-lg bg-black/40 border border-white/10 pl-10 pr-10 px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-yellow-600 ${className}`
          }
          aria-invalid={!!error}
          {...props}
        />
        <button
          type="button"
          onClick={() => setIsVisible((v) => !v)}
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
        >
          {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default PasswordInput;



