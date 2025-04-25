'use client';

import { formatDate } from '@/lib/utils/date';
import { motion } from 'framer-motion';
import { Calendar, Filter, MoreVertical, Search, Shield, UserPlus, Users } from 'lucide-react';
import { useState } from 'react';

const users = [
  {
    id: 1,
    name: 'Александр Иванов',
    email: 'alex@example.com',
    role: 'Администратор',
    status: 'active',
    joinDate: '2023-12-15',
    lastActive: '5 мин назад',
    avatar: '/api/placeholder/100/100',
  },
  {
    id: 2,
    name: 'Мария Петрова',
    email: 'maria@example.com',
    role: 'Модератор',
    status: 'active',
    joinDate: '2024-01-20',
    lastActive: '1 час назад',
    avatar: '/api/placeholder/100/100',
  },
  {
    id: 3,
    name: 'Дмитрий Смирнов',
    email: 'dmitry@example.com',
    role: 'Пользователь',
    status: 'inactive',
    joinDate: '2024-02-10',
    lastActive: '2 дня назад',
    avatar: '/api/placeholder/100/100',
  },
  // Add more users...
];

export default function UsersDashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Пользователи</h1>
          <p className="text-gray-400 mt-1">Управление пользователями системы</p>
        </div>

        <button
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 
                         text-white rounded-lg transition-colors duration-200"
        >
          <UserPlus className="w-5 h-5" />
          Добавить пользователя
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Всего пользователей</p>
              <p className="text-2xl font-bold text-white">2,345</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Users className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Активные</p>
              <p className="text-2xl font-bold text-white">1,890</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <Shield className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Администраторы</p>
              <p className="text-2xl font-bold text-white">12</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Новые за месяц</p>
              <p className="text-2xl font-bold text-white">167</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск пользователей..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg 
                         text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <select
            value={selectedRole}
            onChange={e => setSelectedRole(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white
                     focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Все роли</option>
            <option value="Администратор">Администраторы</option>
            <option value="Модератор">Модераторы</option>
            <option value="Пользователь">Пользователи</option>
          </select>

          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white
                     focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Все статусы</option>
            <option value="active">Активные</option>
            <option value="inactive">Неактивные</option>
          </select>

          <button
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 
                           rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <Filter className="w-5 h-5" />
            Фильтры
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800/50">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Пользователь
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Роль
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Дата регистрации
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Последняя активность
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredUsers.map(user => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`
                      px-2 py-1 text-xs font-medium rounded-full
                      ${
                        user.role === 'Администратор'
                          ? 'bg-red-500/10 text-red-400'
                          : user.role === 'Модератор'
                          ? 'bg-yellow-500/10 text-yellow-400'
                          : 'bg-blue-500/10 text-blue-400'
                      }
                    `}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`
                      px-2 py-1 text-xs font-medium rounded-full
                      ${
                        user.status === 'active'
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-gray-500/10 text-gray-400'
                      }
                    `}
                    >
                      {user.status === 'active' ? 'Активен' : 'Неактивен'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {formatDate(user.joinDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-gray-800/30 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Показано <span className="font-medium">1-10</span> из{' '}
              <span className="font-medium">97</span> пользователей
            </p>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 
                               hover:text-white transition-colors disabled:opacity-50"
                disabled
              >
                Назад
              </button>
              <button
                className="px-3 py-1 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 
                               hover:text-white transition-colors"
              >
                Далее
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
