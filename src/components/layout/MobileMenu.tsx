'use client';

import { navLinks } from '@/data/ui/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, BookOpen, Home, MessageSquare, Newspaper, Search, User } from 'lucide-react';
import Link from 'next/link';
import { JSX } from 'react';

type MobileMenuProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeLink: string;
  setActiveLink: (id: string) => void;
};

export default function MobileMenu({
  isOpen,
  setIsOpen,
  activeLink,
  setActiveLink,
}: MobileMenuProps) {
  // Добавляем иконки к навигационным ссылкам
  const getIcon = (id: string) => {
    switch (id) {
      case 'games':
        return <Home className="h-5 w-5 mr-2" />;
      case 'news':
        return <Newspaper className="h-5 w-5 mr-2" />;
      case 'guides':
        return <BookOpen className="h-5 w-5 mr-2" />;
      case 'social':
        return <MessageSquare className="h-5 w-5 mr-2" />;
      default:
        return <Home className="h-5 w-5 mr-2" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="md:hidden bg-gray-800 border-b border-gray-700 fixed w-full z-40"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-4">
            <SearchInput />
            <Navigation
              activeLink={activeLink}
              setActiveLink={setActiveLink}
              setIsOpen={setIsOpen}
              getIcon={getIcon}
            />
            <UserControls />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SearchInput() {
  return (
    <div className="relative mb-4">
      <input
        type="text"
        placeholder="Поиск..."
        className="bg-gray-700 rounded-lg py-2 px-4 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
    </div>
  );
}

interface NavigationProps {
  activeLink: string;
  setActiveLink: (id: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  getIcon: (id: string) => JSX.Element;
}

function Navigation({ activeLink, setActiveLink, setIsOpen, getIcon }: NavigationProps) {
  return (
    <nav className="flex flex-col space-y-1">
      {navLinks.map((link, index) => (
        <Link
          href={link.path}
          key={link.id}
          className={`flex items-center p-2 rounded ${
            activeLink === link.id
              ? 'bg-indigo-500/10 text-indigo-400'
              : 'text-gray-300 hover:bg-gray-700/30'
          }`}
          onClick={() => {
            setActiveLink(link.id);
            setIsOpen(false);
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            {getIcon(link.id)}
            {link.name}
          </motion.div>
        </Link>
      ))}
    </nav>
  );
}

function UserControls() {
  return (
    <motion.div
      className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.3 }}
    >
      <button className="text-gray-300 hover:text-white transition relative">
        <Bell className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs flex items-center justify-center">
          3
        </span>
      </button>
      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
        <User className="h-5 w-5" />
      </div>
    </motion.div>
  );
}
