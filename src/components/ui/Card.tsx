'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  variant?: 'default' | 'dark' | 'highlight';
  animate?: boolean;
  delay?: number;
}

export function Card({
  children,
  className = '',
  onClick,
  hoverEffect = true,
  variant = 'default',
  animate = true,
  delay = 0,
}: CardProps) {
  const baseStyles = 'rounded-xl overflow-hidden border transition-all duration-500';

  const variantStyles = {
    default: 'bg-gray-800/80 backdrop-blur-sm border-gray-700 hover:border-indigo-500',
    dark: 'bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:border-indigo-500',
    highlight: 'bg-indigo-900/20 backdrop-blur-sm border-indigo-600/30 hover:border-indigo-500',
  };

  const hoverStyles = hoverEffect
    ? 'hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer'
    : '';

  // Если анимация отключена, возвращаем простой div с соответствующими стилями
  if (!animate) {
    return (
      <div
        className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={hoverEffect ? { y: -10 } : undefined}
    >
      {children}
    </motion.div>
  );
}

export interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return <div className={`relative ${className}`}>{children}</div>;
}

export interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return <div className={`px-4 pb-4 ${className}`}>{children}</div>;
}

export interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3
      className={`font-bold text-lg mb-3 group-hover:text-indigo-400 transition-colors duration-300 ${className}`}
    >
      {children}
    </h3>
  );
}

export interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return <p className={`text-gray-400 text-sm ${className}`}>{children}</p>;
}
