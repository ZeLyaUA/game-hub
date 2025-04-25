// src/presentation/components/dashboard/DashboardHeader.tsx
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { NotificationsDashboard } from './NotificationsDashboard';
import { UserProfileDashboard } from './UserProfileDashboard';

export function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-30 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
      <div className="flex items-center justify-between p-4 lg:p-6">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск игр, пользователей..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg 
                       text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 
                       focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 ml-4">
          <NotificationsDashboard />

          <button
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 
                           text-white rounded-lg transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Добавить</span>
          </button>

          <UserProfileDashboard />
        </div>
      </div>
    </header>
  );
}
