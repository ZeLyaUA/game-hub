// src/presentation/components/ui/Card.tsx
import { HTMLMotionProps, motion } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'glass' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const variants = {
  default: 'bg-gray-900/50 border border-gray-800',
  glass: 'bg-gray-900/30 backdrop-blur-lg border border-gray-700/50',
  gradient: 'bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700',
};

const paddings = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  variant = 'default',
  padding = 'md',
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <motion.div
      className={`
        rounded-xl overflow-hidden
        ${variants[variant]}
        ${paddings[padding]}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}
