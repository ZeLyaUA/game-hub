'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export type BadgeVariant =
  | 'default'
  | 'indigo'
  | 'purple'
  | 'blue'
  | 'green'
  | 'red'
  | 'yellow'
  | 'orange';

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  animate?: boolean;
  delay?: number;
}

export function Badge({
  children,
  variant = 'default',
  className = '',
  animate = false,
  delay = 0,
}: BadgeProps) {
  const baseStyles = 'text-xs px-2 py-1 rounded-full border inline-flex items-center';

  const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-gray-700 text-gray-300 border-gray-600',
    indigo: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    green: 'bg-green-500/20 text-green-400 border-green-500/30',
    red: 'bg-red-500/20 text-red-400 border-red-500/30',
    yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  };

  // Если анимация отключена, возвращаем простой span
  if (!animate) {
    return (
      <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>{children}</span>
    );
  }

  return (
    <motion.span
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
    >
      {children}
    </motion.span>
  );
}

export default Badge;
