// src/components/dashboard/UserProfileDashboard.tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { useState } from 'react';

interface UserInfo {
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export function UserProfileDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const user: UserInfo = {
    name: 'Admin',
    email: 'admin@zelyave.com',
    role: 'Администратор',
    avatar: '/api/placeholder/100/100',
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors"
      >
        <div
          className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 
                      flex items-center justify-center text-white font-medium"
        >
          {user.name[0]}
        </div>
        <div className="hidden lg:block text-left">
          <div className="text-sm font-medium text-white">{user.name}</div>
          <div className="text-xs text-gray-400">{user.role}</div>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform hidden lg:block ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Click outside overlay */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

            {/* Dropdown menu */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 mt-2 w-64 bg-gray-900 rounded-xl shadow-xl border border-gray-800 
                       overflow-hidden z-50"
            >
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 
                                flex items-center justify-center text-white font-medium text-lg"
                  >
                    {user.name[0]}
                  </div>
                  <div>
                    <div className="font-medium text-white">{user.name}</div>
                    <div className="text-sm text-gray-400">{user.email}</div>
                    <div className="mt-1">
                      <span
                        className="px-2 py-0.5 text-xs font-medium bg-indigo-500/10 text-indigo-400 
                                     rounded-full border border-indigo-500/20"
                      >
                        {user.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <button
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white 
                           hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4" />
                  Мой профиль
                </button>
                <button
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white 
                           hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Настройки
                </button>
              </div>

              <div className="p-2 border-t border-gray-800">
                <button
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 
                           hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Выйти
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
