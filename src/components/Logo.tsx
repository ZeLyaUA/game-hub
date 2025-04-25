'use client';

import { motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';

export function Logo() {
  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="relative flex items-center gap-2">
        {/* Logo icon */}
        <motion.div
          className="relative w-10 h-10"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Gamepad2 className="w-6 h-6 text-white relative z-10" />
          </div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-cyan-400 rounded-lg"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.2 }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0, 0.15, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Logo text */}
        <motion.h1
          className="text-2xl font-bold tracking-tight"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <span className="text-white">Ze</span>
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Ляве
          </span>
        </motion.h1>
      </div>

      {/* Hover line animation */}
      <motion.div
        className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-indigo-500 to-cyan-500"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
