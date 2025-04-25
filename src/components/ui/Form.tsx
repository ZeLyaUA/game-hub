// src/components/ui/Form.tsx
'use client';

import { ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface FormFieldProps {
  label: string;
  icon?: ReactNode;
  error?: string;
  children: ReactNode;
  required?: boolean;
}

export function FormField({ label, icon, error, required, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
        {icon}
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ className = '', error, ...props }: InputProps) {
  return (
    <input
      className={`
        w-full px-4 py-2.5 bg-gray-800/50 border rounded-lg 
        focus:outline-none focus:ring-1 text-white placeholder-gray-500 transition-colors
        ${
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-700 focus:border-indigo-500 focus:ring-indigo-500'
        }
        ${className}
      `}
      {...props}
    />
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function Textarea({ className = '', error, ...props }: TextareaProps) {
  return (
    <textarea
      className={`
        w-full px-4 py-2.5 bg-gray-800/50 border rounded-lg 
        focus:outline-none focus:ring-1 text-white placeholder-gray-500 resize-none transition-colors
        ${
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-700 focus:border-indigo-500 focus:ring-indigo-500'
        }
        ${className}
      `}
      {...props}
    />
  );
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options: { value: string; label: string }[];
}

export function Select({ className = '', error, options, ...props }: SelectProps) {
  return (
    <select
      className={`
        w-full px-4 py-2.5 bg-gray-800/50 border rounded-lg 
        focus:outline-none focus:ring-1 text-white transition-colors
        ${
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-700 focus:border-indigo-500 focus:ring-indigo-500'
        }
        ${className}
      `}
      {...props}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

export function Switch({ checked, onChange, label, description }: SwitchProps) {
  return (
    <label className="flex items-center justify-between">
      <div>
        <div className="text-white font-medium">{label}</div>
        {description && <div className="text-sm text-gray-400">{description}</div>}
      </div>
      <div className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
        />
        <div
          className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full 
                    peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 
                    after:left-[2px] after:bg-white after:border-gray-300 after:border 
                    after:rounded-full after:h-5 after:w-5 after:transition-all 
                    peer-checked:bg-indigo-600"
        />
      </div>
    </label>
  );
}
