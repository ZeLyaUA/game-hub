'use client';

import { motion } from 'framer-motion';
import { LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Logo } from './Logo';

interface NavbarProps {
  showDashboard?: boolean;
}

export function Navbar({ showDashboard = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-30 p-4 md:p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Logo />

        {/* Mobile menu button */}
        <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop menu */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="hidden md:flex items-center gap-6"
        >
          <button className="text-gray-400 hover:text-white transition-colors duration-300">
            Новости
          </button>
          <button className="text-gray-400 hover:text-white transition-colors duration-300">
            Сообщество
          </button>
          {showDashboard && (
            <Link
              href="/dashboard"
              className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              Панель управления
            </Link>
          )}
          <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity duration-300">
            Войти
          </button>
        </motion.div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-sm md:hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              <button className="text-gray-400 hover:text-white transition-colors duration-300 text-left py-2">
                Новости
              </button>
              <button className="text-gray-400 hover:text-white transition-colors duration-300 text-left py-2">
                Сообщество
              </button>
              {showDashboard && (
                <Link
                  href="/dashboard"
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-left py-2 flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Панель управления
                </Link>
              )}
              <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity duration-300 w-full">
                Войти
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
