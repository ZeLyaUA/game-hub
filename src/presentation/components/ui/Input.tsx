// src/presentation/components/ui/Input.tsx
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && <label className="block text-sm font-medium text-gray-300">{label}</label>}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-4 py-2.5 bg-gray-800/50 border rounded-lg
              text-white placeholder-gray-500 
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
              disabled:opacity-50 disabled:cursor-not-allowed
              ${icon ? 'pl-10' : ''}
              ${error ? 'border-red-500' : 'border-gray-700'}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
