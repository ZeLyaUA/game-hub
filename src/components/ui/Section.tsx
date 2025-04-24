'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface SectionProps {
  children: ReactNode;
  className?: string;
  ref?: React.ForwardedRef<HTMLElement>;
  id?: string;
  withContainer?: boolean;
  withBackground?: boolean;
  withGradientBackground?: boolean;
  variant?: 'default' | 'dark' | 'light';
}

export function Section({
  children,
  ref,
  className = '',
  id,
  withContainer = true,
  withBackground = false,
  withGradientBackground = false,
  variant = 'default',
}: SectionProps) {
  const baseStyles = 'py-20 relative overflow-hidden';

  const variantStyles = {
    default: '',
    dark: 'bg-gray-800',
    light: 'bg-gray-900/50',
  };

  const backgroundStyles = withBackground ? 'bg-gray-800/50' : '';

  const gradientStyles = withGradientBackground
    ? 'bg-gradient-to-br from-indigo-900/10 to-purple-900/10'
    : '';

  return (
    <section
      id={id}
      ref={ref}
      className={`${baseStyles} ${variantStyles[variant]} ${backgroundStyles} ${gradientStyles} ${className}`}
    >
      {withBackground && (
        <>
          <div className="absolute top-0 right-0 w-1/2 h-1/3 bg-purple-600/10 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-600/10 blur-3xl rounded-full"></div>
        </>
      )}

      {withGradientBackground && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 to-purple-900/10"></div>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-600/10 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-600/10 blur-3xl rounded-full"></div>
        </>
      )}

      {withContainer ? (
        <div className="container mx-auto px-4 relative z-10">{children}</div>
      ) : (
        <div className="relative z-10">{children}</div>
      )}
    </section>
  );
}

export interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  withAnimation?: boolean;
}

export function SectionHeader({
  title,
  description,
  className = '',
  titleClassName = '',
  descriptionClassName = '',
  withAnimation = true,
}: SectionHeaderProps) {
  if (!withAnimation) {
    return (
      <div className={`text-center mb-12 relative ${className}`}>
        <h2
          className={`text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent ${titleClassName}`}
        >
          {title}
        </h2>
        {description && (
          <p className={`text-gray-300 max-w-2xl mx-auto text-lg ${descriptionClassName}`}>
            {description}
          </p>
        )}
      </div>
    );
  }

  return (
    <motion.div
      className={`text-center mb-12 relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <motion.h2
        className={`text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent ${titleClassName}`}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          className={`text-gray-300 max-w-2xl mx-auto text-lg ${descriptionClassName}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
