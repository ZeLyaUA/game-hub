// src/presentation/components/dashboard/RecentActivity.tsx
import { motion } from 'framer-motion';
import { Clock, Edit2, Eye, Plus, Trash2, Users } from 'lucide-react';

interface Activity {
  id: string;
  type: 'create' | 'update' | 'delete' | 'user' | 'view';
  title: string;
  description: string;
  time: string;
  user: string;
}

export function RecentActivity() {
  const activities: Activity[] = [
    {
      id: '1',
      type: 'create',
      title: 'Добавлена новая игра',
      description: 'Throne and Liberty добавлена в базу данных',
      time: '5 мин назад',
      user: 'Admin',
    },
    {
      id: '2',
      type: 'update',
      title: 'Обновлен статус игры',
      description: 'Lost Ark теперь имеет статус "active"',
      time: '12 мин назад',
      user: 'Moderator',
    },
    {
      id: '3',
      type: 'delete',
      title: 'Удалена игра',
      description: 'New World удалена из базы данных',
      time: '1 час назад',
      user: 'Admin',
    },
    {
      id: '4',
      type: 'user',
      title: 'Новый пользователь',
      description: 'Зарегистрирован новый пользователь: John Doe',
      time: '2 часа назад',
      user: 'System',
    },
    {
      id: '5',
      type: 'view',
      title: 'Просмотр страницы',
      description: 'Страница игры Odin получила 1000 просмотров',
      time: '3 часа назад',
      user: 'System',
    },
  ];

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'create':
        return <Plus className="w-5 h-5 text-green-400" />;
      case 'update':
        return <Edit2 className="w-5 h-5 text-blue-400" />;
      case 'delete':
        return <Trash2 className="w-5 h-5 text-red-400" />;
      case 'user':
        return <Users className="w-5 h-5 text-purple-400" />;
      case 'view':
        return <Eye className="w-5 h-5 text-orange-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-4">Последняя активность</h2>
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800">
        <div className="divide-y divide-gray-800">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 hover:bg-gray-800/30 transition-colors duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">{getIcon(activity.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-medium">{activity.title}</h3>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{activity.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 
                                  flex items-center justify-center text-white text-xs font-medium"
                    >
                      {activity.user[0]}
                    </div>
                    <span className="text-sm text-gray-400">{activity.user}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-800">
          <button
            className="w-full text-center text-sm text-indigo-400 hover:text-indigo-300 
                           transition-colors"
          >
            Показать все действия
          </button>
        </div>
      </div>
    </div>
  );
}
