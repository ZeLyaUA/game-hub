'use client';

import { ArrowDown, ArrowUp, Clock, Eye, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const monthlyData = [
  { month: 'Янв', users: 4000, views: 24000, games: 5 },
  { month: 'Фев', users: 3000, views: 18000, games: 7 },
  { month: 'Мар', users: 5000, views: 28000, games: 10 },
  { month: 'Апр', users: 4500, views: 32000, games: 12 },
  { month: 'Май', users: 6000, views: 38000, games: 15 },
  { month: 'Июн', users: 7000, views: 42000, games: 18 },
];

const gamesByStatus = [
  { name: 'Активные', value: 65 },
  { name: 'Скоро', value: 25 },
  { name: 'Архив', value: 10 },
];

const COLORS = ['#6366f1', '#f59e0b', '#6b7280'];

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: number;
  color: string;
}

const StatCard = ({ title, value, icon: Icon, trend, color }: StatCardProps) => (
  <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg bg-gradient-to-br ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      {trend && (
        <div
          className={`flex items-center gap-1 text-sm ${
            trend > 0 ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {trend > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-white mt-1">{value}</p>
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-xl">
        <p className="text-white font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm text-gray-300">
            {entry.name}: <span className="text-white font-medium">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function StatsDashboard() {
  const [timeRange, setTimeRange] = useState('6m');

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Статистика</h1>
          <p className="text-gray-400 mt-1">Аналитика и отчеты</p>
        </div>

        <select
          value={timeRange}
          onChange={e => setTimeRange(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
        >
          <option value="7d">Последние 7 дней</option>
          <option value="1m">Последний месяц</option>
          <option value="6m">Последние 6 месяцев</option>
          <option value="1y">Последний год</option>
        </select>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Всего пользователей"
          value="29.4K"
          icon={Users}
          trend={12.5}
          color="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Посещения"
          value="182.5K"
          icon={Eye}
          trend={-5.3}
          color="from-green-500 to-emerald-500"
        />
        <StatCard
          title="Активные игры"
          value="65"
          icon={TrendingUp}
          trend={8.2}
          color="from-purple-500 to-pink-500"
        />
        <StatCard
          title="Среднее время"
          value="6.8 мин"
          icon={Clock}
          trend={3.1}
          color="from-orange-500 to-amber-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Активность пользователей</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={{ fill: '#6366f1', strokeWidth: 2 }}
                  name="Пользователи"
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: '#10b981', strokeWidth: 2 }}
                  name="Просмотры"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Игры по статусу</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gamesByStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {gamesByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              {gamesByStatus.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-sm text-gray-400">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="lg:col-span-3 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Добавление игр по месяцам</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="games" fill="#6366f1" radius={[4, 4, 0, 0]} name="Игры" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Последняя активность</h2>
        <div className="space-y-4">
          {[
            { action: 'Добавлена новая игра', game: 'Throne and Liberty', time: '5 мин назад' },
            { action: 'Обновлен статус', game: 'Lost Ark', time: '12 мин назад' },
            { action: 'Удалена игра', game: 'New World', time: '1 час назад' },
            { action: 'Добавлена новая игра', game: 'Black Desert Online', time: '2 часа назад' },
            { action: 'Обновлен статус', game: 'ArcheAge 2', time: '3 часа назад' },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0"
            >
              <div>
                <p className="text-white">{item.action}</p>
                <p className="text-sm text-gray-400">{item.game}</p>
              </div>
              <span className="text-sm text-gray-500">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
