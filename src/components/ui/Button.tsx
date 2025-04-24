'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'indigo' | 'purple';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonBaseProps {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  fullWidth?: boolean;
  animate?: boolean;
}

export interface ButtonProps extends ButtonBaseProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface ButtonLinkProps extends ButtonBaseProps {
  href: string;
  target?: '_blank' | '_self';
  rel?: string;
}

export function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  fullWidth = false,
  animate = true,
  type = 'button',
  onClick,
}: ButtonProps) {
  const baseStyles = 'font-medium transition-all duration-300 flex items-center justify-center';

  const variantStyles = {
    primary: 'bg-indigo-600 hover:bg-indigo-500 text-white',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-white',
    outline: 'bg-transparent border border-gray-600 hover:border-indigo-500 text-white',
    ghost: 'bg-transparent text-gray-300 hover:text-white hover:bg-gray-800',
    indigo:
      'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white',
    purple:
      'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white',
  };

  const sizeStyles = {
    sm: 'text-sm py-2 px-4 rounded-lg',
    md: 'py-3 px-6 rounded-lg',
    lg: 'text-lg py-4 px-8 rounded-lg',
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  const contents = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="h-5 w-5 mr-2" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="h-5 w-5 ml-2" />}
    </>
  );

  if (!animate) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${disabledStyle} ${className}`}
      >
        {contents}
      </button>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${disabledStyle} ${className}`}
      whileHover={!disabled ? { y: -5, boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.4)' } : {}}
      whileTap={!disabled ? { y: 0, boxShadow: '0 0 0 0 rgba(99, 102, 241, 0)' } : {}}
    >
      <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
      {contents}
    </motion.button>
  );
}

export function ButtonLink({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  fullWidth = false,
  animate = true,
  href,
  target,
  rel,
}: ButtonLinkProps) {
  const baseStyles = 'font-medium transition-all duration-300 flex items-center justify-center';

  const variantStyles = {
    primary: 'bg-indigo-600 hover:bg-indigo-500 text-white',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-white',
    outline: 'bg-transparent border border-gray-600 hover:border-indigo-500 text-white',
    ghost: 'bg-transparent text-gray-300 hover:text-white hover:bg-gray-800',
    indigo:
      'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white',
    purple:
      'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white',
  };

  const sizeStyles = {
    sm: 'text-sm py-2 px-4 rounded-lg',
    md: 'py-3 px-6 rounded-lg',
    lg: 'text-lg py-4 px-8 rounded-lg',
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const disabledStyle = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : 'cursor-pointer';

  const contents = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="h-5 w-5 mr-2" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="h-5 w-5 ml-2" />}
    </>
  );

  const linkProps = {
    href: disabled ? '#' : href,
    target,
    rel: target === '_blank' ? 'noopener noreferrer' : rel,
  };

  if (!animate) {
    return (
      <Link
        {...linkProps}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${disabledStyle} ${className}`}
      >
        {contents}
      </Link>
    );
  }

  return (
    <motion.div
      whileHover={!disabled ? { y: -5, boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.4)' } : {}}
      whileTap={!disabled ? { y: 0, boxShadow: '0 0 0 0 rgba(99, 102, 241, 0)' } : {}}
    >
      <Link
        {...linkProps}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${disabledStyle} ${className}`}
      >
        <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
        {contents}
      </Link>
    </motion.div>
  );
}
