'use client';

import { TwitchStream } from '@/data/content/streams';
import { formatNumber } from '@/utils/format';
import { motion } from 'framer-motion';
import { ChevronRight, Play, Twitch } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface StreamItemProps {
  stream: TwitchStream;
  index: number;
}

export function StreamItem({ stream, index }: StreamItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 group"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, type: 'spring', stiffness: 100, delay: index * 0.1 },
        },
      }}
      whileHover={{ y: -10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-48 relative">
        <Image
          src={stream.thumbnail}
          alt={stream.title}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            isHovered ? 'opacity-100' : 'opacity-0'
          } flex items-center justify-center`}
        >
          <motion.div
            className="h-16 w-16 rounded-full bg-indigo-600/80 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <Play className="h-8 w-8 text-white" />
          </motion.div>
        </div>
        <div className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded font-medium flex items-center">
          <div className="h-2 w-2 bg-white rounded-full mr-1 animate-pulse"></div>
          LIVE
        </div>
        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {stream.duration}
        </div>
      </div>

      <div className="p-4 h-full">
        <div className="flex items-center text-xs text-gray-400 mb-2">
          <Twitch className="h-4 w-4 text-purple-500 mr-1" />
          <span>{stream.date}</span>
          <span className="mx-2">•</span>
          <span>{formatNumber(stream.viewers)} зрителей</span>
        </div>
        <h3 className="font-bold text-lg mb-3 group-hover:text-indigo-400 transition-colors duration-300 line-clamp-2">
          {stream.title}
        </h3>
        <motion.button
          className="flex items-center text-indigo-400 hover:text-indigo-300 text-sm font-medium group"
          whileHover={{ x: 5 }}
        >
          <span>Смотреть трансляцию</span>
          <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
        </motion.button>
      </div>
    </motion.div>
  );
}
