'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Bell, CheckCheck, CheckCircle, Info, X } from 'lucide-react';
import { useState } from 'react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export function NotificationsDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Игра добавлена',
      message: 'Throne and Liberty успешно добавлена в базу данных',
      time: '5 мин назад',
      read: false,
    },
    {
      id: '2',
      type: 'error',
      title: 'Ошибка загрузки',
      message: 'Не удалось загрузить изображение для игры "Lost Ark"',
      time: '15 мин назад',
      read: false,
    },
    {
      id: '3',
      type: 'info',
      title: 'Новое обновление',
      message: 'Доступна новая версия панели управления',
      time: '1 час назад',
      read: true,
    },
    {
      id: '4',
      type: 'warning',
      title: 'Требуется внимание',
      message: 'Некоторые игры имеют неполное описание',
      time: '2 часа назад',
      read: true,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map(notif => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-orange-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-white transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full" />
        )}
      </button>

      {/* Notifications panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay to close when clicking outside */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

            {/* Notification panel */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-96 bg-gray-900 rounded-xl shadow-xl border border-gray-800 
                        overflow-hidden z-50"
            >
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Уведомления</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    <CheckCheck className="w-4 h-4" />
                    Прочитать все
                  </button>
                )}
              </div>

              <div className="max-h-96 overflow-y-auto">
                <AnimatePresence>
                  {notifications.map(notification => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className={`p-4 border-b border-gray-800 last:border-0 hover:bg-gray-800/50 
                           transition-colors ${!notification.read ? 'bg-gray-800/30' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-white">{notification.title}</h4>
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">{notification.time}</span>
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-indigo-400 hover:text-indigo-300"
                              >
                                Прочитано
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {notifications.length === 0 && (
                  <div className="p-8 text-center">
                    <Bell className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">Нет новых уведомлений</p>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-gray-800 text-center">
                <button className="text-sm text-indigo-400 hover:text-indigo-300">
                  Все уведомления
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
