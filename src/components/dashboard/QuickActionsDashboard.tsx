'use client';

import { motion } from 'framer-motion';
import { BarChart3, Plus, RefreshCw, Settings, Upload, Users } from 'lucide-react';

export function QuickActionsDashboard() {
  const actions = [
    {
      title: 'Добавить игру',
      description: 'Добавить новую игру в базу',
      icon: Plus,
      color: 'from-blue-500 to-cyan-500',
      onClick: () => {
        /* Handle action */
      },
    },
    {
      title: 'Загрузить контент',
      description: 'Загрузить новости или гайды',
      icon: Upload,
      color: 'from-green-500 to-emerald-500',
      onClick: () => {
        /* Handle action */
      },
    },
    {
      title: 'Управление пользователями',
      description: 'Перейти к списку пользователей',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      onClick: () => {
        /* Handle action */
      },
    },
    {
      title: 'Настройки',
      description: 'Настроить параметры системы',
      icon: Settings,
      color: 'from-orange-500 to-amber-500',
      onClick: () => {
        /* Handle action */
      },
    },
    {
      title: 'Статистика',
      description: 'Посмотреть аналитику',
      icon: BarChart3,
      color: 'from-red-500 to-rose-500',
      onClick: () => {
        /* Handle action */
      },
    },
    {
      title: 'Обновить данные',
      description: 'Синхронизировать информацию',
      icon: RefreshCw,
      color: 'from-teal-500 to-cyan-500',
      onClick: () => {
        /* Handle action */
      },
    },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-white mb-4">Быстрые действия</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <motion.button
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={action.onClick}
            className="flex items-start gap-4 p-4 bg-gray-900/50 border border-gray-800 
                     rounded-xl hover:bg-gray-800/50 transition-all duration-300 text-left group"
          >
            <div
              className={`p-3 rounded-lg bg-gradient-to-br ${action.color} group-hover:scale-110 
                          transition-transform duration-300`}
            >
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium mb-1">{action.title}</h3>
              <p className="text-sm text-gray-400">{action.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
