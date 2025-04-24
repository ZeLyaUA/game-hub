'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface NavigationLinkProps {
  href: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export default function NavigationLink({ href, isActive, onClick, children }: NavigationLinkProps) {
  return (
    <Link href={href}>
      <motion.div
        className={`${
          isActive ? 'text-indigo-400' : 'text-gray-300 hover:text-indigo-400'
        } relative transition-colors duration-300`}
        onClick={onClick}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
      >
        {children}
        {isActive && (
          <motion.span
            className="absolute bottom-[-4px] left-0 h-[2px] bg-indigo-500 rounded-full w-full"
            layoutId="underline"
          />
        )}
      </motion.div>
    </Link>
  );
}
