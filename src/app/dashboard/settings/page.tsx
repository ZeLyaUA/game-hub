'use client';

import { Bell, Database, Globe, Palette, Save, Shield, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function SettingsDashboardPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);
  const [cleanupResult, setCleanupResult] = useState<string | null>(null);

  const tabs = [
    { id: 'general', name: 'Основные', icon: Globe },
    { id: 'notifications', name: 'Уведомления', icon: Bell },
    { id: 'security', name: 'Безопасность', icon: Shield },
    { id: 'database', name: 'База данных', icon: Database },
    { id: 'appearance', name: 'Внешний вид', icon: Palette },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Имитация сохранения
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const handleCleanup = async () => {
    setIsCleaning(true);
    setCleanupResult(null);

    try {
      const response = await fetch('/api/cleanup', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        setCleanupResult(`Удалено файлов: ${data.deletedCount}`);
      } else {
        setCleanupResult('Ошибка при очистке файлов');
      }
    } catch (error) {
      console.error(error);
      setCleanupResult('Ошибка при очистке файлов');
    } finally {
      setIsCleaning(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Настройки</h1>
        <p className="text-gray-400 mt-1">Управление параметрами сайта</p>
      </div>

      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-800">
          <nav className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors
                  ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-white'
                      : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                  }
                `}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Название сайта
                </label>
                <input
                  type="text"
                  defaultValue="ZeЛяве - Zone Experience Live"
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg 
                           text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Описание сайта
                </label>
                <textarea
                  rows={3}
                  defaultValue="Новости, гайды и сообщество для игроков MMORPG. Zone Experience Live - твой гид по игровым мирам."
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg 
                           text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email администратора
                </label>
                <input
                  type="email"
                  defaultValue="admin@zelyave.com"
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg 
                           text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Email уведомления</h3>
                  <p className="text-sm text-gray-400">Получать уведомления на email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div
                    className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full 
                                peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 
                                after:left-[2px] after:bg-white after:border-gray-300 after:border 
                                after:rounded-full after:h-5 after:w-5 after:transition-all 
                                peer-checked:bg-indigo-600"
                  ></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Push уведомления</h3>
                  <p className="text-sm text-gray-400">Показывать push-уведомления</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div
                    className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full 
                                peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 
                                after:left-[2px] after:bg-white after:border-gray-300 after:border 
                                after:rounded-full after:h-5 after:w-5 after:transition-all 
                                peer-checked:bg-indigo-600"
                  ></div>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Двухфакторная аутентификация
                </label>
                <div className="flex items-center gap-4">
                  <button
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg 
                                   transition-colors duration-200"
                  >
                    Включить
                  </button>
                  <span className="text-gray-400">Не активирована</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Сменить пароль
                </label>
                <div className="space-y-4">
                  <input
                    type="password"
                    placeholder="Текущий пароль"
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg 
                             text-white focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="password"
                    placeholder="Новый пароль"
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg 
                             text-white focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="password"
                    placeholder="Подтвердите новый пароль"
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg 
                             text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="space-y-6">
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <h3 className="text-white font-medium mb-2">Состояние базы данных</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Размер БД:</span>
                    <span className="text-white">1.2 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Последняя резервная копия:</span>
                    <span className="text-white">25.04.2025, 03:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Версия PostgreSQL:</span>
                    <span className="text-white">15.2</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg 
                                 transition-colors duration-200"
                >
                  Создать резервную копию
                </button>
                <button
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg 
                                 transition-colors duration-200"
                >
                  Очистить кэш
                </button>
              </div>

              <div className="mt-8 border-t border-gray-700 pt-6">
                <h3 className="text-white font-medium mb-4">Управление файлами</h3>
                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <p className="text-gray-300 mb-4">
                    Удалить все неиспользуемые изображения из директории uploads
                  </p>
                  <button
                    onClick={handleCleanup}
                    disabled={isCleaning}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 
                             text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
                  >
                    {isCleaning ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Очистка...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-5 h-5" />
                        Очистить неиспользуемые файлы
                      </>
                    )}
                  </button>
                  {cleanupResult && <p className="mt-4 text-sm text-gray-400">{cleanupResult}</p>}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Тема оформления
                </label>
                <select
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg 
                           text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="dark">Темная</option>
                  <option value="light">Светлая</option>
                  <option value="system">Системная</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Основной цвет
                </label>
                <div className="flex gap-4">
                  {['#6366f1', '#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e'].map(color => (
                    <button
                      key={color}
                      className="w-10 h-10 rounded-lg border-2 border-gray-700 hover:border-white 
                               transition-colors duration-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Шрифт интерфейса
                </label>
                <select
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg 
                           text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="inter">Inter</option>
                  <option value="roboto">Roboto</option>
                  <option value="system">Системный</option>
                </select>
              </div>
            </div>
          )}

          {/* Save button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 
                       text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
