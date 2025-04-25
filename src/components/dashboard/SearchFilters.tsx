'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import { useState } from 'react';

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
}

export function SearchFilters({ onSearch, onFilterChange }: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    sortBy: 'date',
    order: 'desc',
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск игр..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg 
                     text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 
                     focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Filter toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`
            flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors
            ${
              showFilters
                ? 'bg-indigo-600 border-indigo-500 text-white'
                : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white'
            }
          `}
        >
          <Filter className="w-5 h-5" />
          <span className="hidden sm:inline">Фильтры</span>
        </button>
      </div>

      {/* Filters panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Status filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Статус</label>
                  <select
                    value={filters.status}
                    onChange={e => handleFilterChange('status', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white
                             focus:outline-none focus:border-indigo-500"
                  >
                    <option value="all">Все</option>
                    <option value="active">Активные</option>
                    <option value="coming">Скоро</option>
                  </select>
                </div>

                {/* Sort by */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Сортировать по
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={e => handleFilterChange('sortBy', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white
                             focus:outline-none focus:border-indigo-500"
                  >
                    <option value="date">Дате добавления</option>
                    <option value="title">Названию</option>
                    <option value="status">Статусу</option>
                  </select>
                </div>

                {/* Order */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Порядок</label>
                  <select
                    value={filters.order}
                    onChange={e => handleFilterChange('order', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white
                             focus:outline-none focus:border-indigo-500"
                  >
                    <option value="desc">По убыванию</option>
                    <option value="asc">По возрастанию</option>
                  </select>
                </div>
              </div>

              {/* Reset filters */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    const defaultFilters = { status: 'all', sortBy: 'date', order: 'desc' };
                    setFilters(defaultFilters);
                    onFilterChange(defaultFilters);
                  }}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Сбросить фильтры
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
