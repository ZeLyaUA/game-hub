'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { navLinks } from '@/data/ui/navigation';
import { motion } from 'framer-motion';
import { Bell, Gamepad2, Menu, Moon, Search, Sun, User, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MobileMenu from './MobileMenu';
import NavigationLink from './NavigationLink';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeLink, setActiveLink] = useState('home');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className="bg-gray-800/95 border-b border-gray-700 fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-all duration-500"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      style={{
        boxShadow: scrollY > 50 ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="cursor-pointer">
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Gamepad2 className="h-8 w-8 text-indigo-500" />
              <div className="ml-2 flex flex-col">
                <span className="text-xl font-bold text-gradient-purple">ZeЛяве</span>
                <span className="text-xs text-gray-300 -mt-1">Братство</span>
              </div>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <SearchInput />
            <Navigation activeLink={activeLink} setActiveLink={setActiveLink} />
            <UserControls toggleTheme={toggleTheme} theme={theme} />
          </div>

          <motion.button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
      />
    </motion.header>
  );
}

function SearchInput() {
  return (
    <motion.div className="relative" whileHover={{ scale: 1.05 }}>
      <input
        type="text"
        placeholder="Поиск игр, гайдов, новостей..."
        className="bg-gray-700/70 rounded-lg py-2 px-4 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 focus:w-80"
      />
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
    </motion.div>
  );
}

interface NavigationProps {
  activeLink: string;
  setActiveLink: (id: string) => void;
}

function Navigation({ activeLink, setActiveLink }: NavigationProps) {
  return (
    <nav className="flex items-center space-x-6">
      {navLinks.map(link => (
        <NavigationLink
          key={link.id}
          href={link.path}
          isActive={activeLink === link.id}
          onClick={() => setActiveLink(link.id)}
        >
          {link.name}
        </NavigationLink>
      ))}
    </nav>
  );
}

interface UserControlsProps {
  toggleTheme: () => void;
  theme: 'dark' | 'light';
}

function UserControls({ toggleTheme, theme }: UserControlsProps) {
  return (
    <div className="flex items-center space-x-4">
      <motion.button
        className="text-gray-300 hover:text-white transition-all duration-300"
        onClick={toggleTheme}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </motion.button>

      <motion.button
        className="text-gray-300 hover:text-white transition-all duration-300 relative"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <Bell className="h-5 w-5" />
        <motion.span
          className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        >
          3
        </motion.span>
      </motion.button>

      <motion.div
        className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center cursor-pointer"
        whileHover={{ scale: 1.1, boxShadow: '0 0 8px rgba(99, 102, 241, 0.6)' }}
        whileTap={{ scale: 0.9 }}
      >
        <User className="h-5 w-5" />
      </motion.div>
    </div>
  );
}
