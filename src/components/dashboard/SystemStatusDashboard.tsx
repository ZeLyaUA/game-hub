'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Cloud, Database, Server, Shield } from 'lucide-react';

export function SystemStatusDashboard() {
  const statusItems = [
    {
      name: 'API сервер',
      status: 'operational',
      uptime: '99.99%',
      icon: Server,
    },
    {
      name: 'База данных',
      status: 'operational',
      uptime: '99.95%',
      icon: Database,
    },
    {
      name: 'CDN',
      status: 'degraded',
      uptime: '98.50%',
      icon: Cloud,
    },
    {
      name: 'Безопасность',
      status: 'operational',
      uptime: '100%',
      icon: Shield,
    },
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'operational':
        return {
          color: 'bg-green-500',
          text: 'Работает',
          icon: <CheckCircle className="w-4 h-4 text-green-400" />,
        };
      case 'degraded':
        return {
          color: 'bg-yellow-500',
          text: 'Проблемы',
          icon: <AlertTriangle className="w-4 h-4 text-yellow-400" />,
        };
      default:
        return {
          color: 'bg-red-500',
          text: 'Не работает',
          icon: <AlertTriangle className="w-4 h-4 text-red-400" />,
        };
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-white mb-4">Статус системы</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusItems.map((item, index) => {
          const statusInfo = getStatusInfo(item.status);

          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <item.icon className="w-5 h-5 text-gray-400" />
                  </div>
                  <h3 className="text-white font-medium">{item.name}</h3>
                </div>
                {statusInfo.icon}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Статус</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${statusInfo.color}`} />
                    <span className="text-sm text-gray-300">{statusInfo.text}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Uptime</span>
                  <span className="text-sm text-gray-300">{item.uptime}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
