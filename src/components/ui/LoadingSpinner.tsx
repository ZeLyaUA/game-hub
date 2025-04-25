// src/components/ui/LoadingSpinner.tsx
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  color?: string;
}

export function LoadingSpinner({
  size = 'md',
  className = '',
  color = 'border-indigo-500',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <motion.div
      className={`
        animate-spin rounded-full border-t-transparent
        ${sizeClasses[size]}
        ${color}
        ${className}
      `}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    />
  );
}
