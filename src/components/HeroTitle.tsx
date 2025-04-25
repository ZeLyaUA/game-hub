'use client';

import { motion } from 'framer-motion';

export function HeroTitle() {
  return (
    <motion.div
      className="text-center mb-8 md:mb-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
    >
      <div className="relative">
        {/* Glowing background effect */}
        <div className="absolute inset-0 blur-3xl opacity-30">
          <div className="w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />
        </div>

        {/* Main title with 3D effect */}
        <motion.div
          className="relative"
          animate={{
            rotateX: [0, 0.5, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <h2
            className="text-3xl md:text-6xl font-black mb-4 tracking-wider relative"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              transform: 'perspective(500px) rotateX(-10deg)',
              transformOrigin: 'center',
            }}
          >
            <motion.span
              className="inline-block bg-gradient-to-r from-indigo-200 via-purple-200 to-cyan-200 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ backgroundSize: '200% auto' }}
            >
              ZONE
            </motion.span>
            <motion.span
              className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mx-1 md:mx-2"
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              EXPERIENCE
            </motion.span>
            <motion.span
              className="inline-block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              LIVE
            </motion.span>
          </h2>
        </motion.div>

        {/* Neon line under text */}
        <motion.div
          className="h-1 w-32 md:w-64 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full mb-4 md:mb-6"
          animate={{
            scaleX: [0.8, 1, 0.8],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <motion.p
        className="text-lg md:text-2xl text-gray-400 font-medium"
        style={{ fontFamily: "'Rajdhani', sans-serif" }}
        animate={{
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        Твой гид по игровым мирам
      </motion.p>
    </motion.div>
  );
}
