// src/components/dashboard/StatCard.tsx
'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  name: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
  index?: number;
}

export function StatCard({
  name,
  value,
  icon: Icon,
  color,
  bgColor,
  borderColor,
  index = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`
        relative overflow-hidden rounded-xl border ${borderColor}
        ${bgColor} backdrop-blur-sm p-6
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{name}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-br ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Decorative gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5`} />
    </motion.div>
  );
}
