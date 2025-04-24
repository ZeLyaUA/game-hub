'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface OdinNavigationProps {
  activeSection: string;
  onNavigationClick: (sectionId: string) => void;
}

export default function OdinNavigation({ activeSection, onNavigationClick }: OdinNavigationProps) {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById('overview')?.offsetTop || 500;
      setSticky(window.scrollY > heroHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Обзор' },
    { id: 'classes', label: 'Классы' },
    { id: 'regions', label: 'Регионы' },
    { id: 'database', label: 'База данных' },
    { id: 'bosses', label: 'Боссы' },
  ];

  return (
    <motion.nav
      className={`bg-gray-800/95 backdrop-blur-sm z-40 border-b border-gray-700 ${
        sticky ? 'fixed top-16 left-0 right-0' : 'relative'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <ul className="flex space-x-1 md:space-x-4 overflow-x-auto scrollbar-hide py-4">
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => onNavigationClick(item.id)}
                  className={`px-3 md:px-5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    activeSection === item.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}
