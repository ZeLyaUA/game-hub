'use client';

import { Section, SectionHeader } from '@/components/ui/Section';
import { useStreams } from '@/hooks/useData';
import useIntersection from '@/hooks/useIntersection';
import { motion } from 'framer-motion';
import { Twitch, Youtube } from 'lucide-react';
import { useState } from 'react';
import { StreamItem } from '../streams/StreamItem';
import { VideoItem } from '../streams/VideoItem';

const StreamSection = () => {
  const [activeTab, setActiveTab] = useState('twitch');
  const [ref, inView] = useIntersection({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { twitchStreams, youtubeVideos, isLoading } = useStreams();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  if (isLoading) {
    return (
      <Section withBackground variant="dark" className="min-h-[400px]">
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Section>
    );
  }

  return (
    <Section withBackground variant="dark">
      <SectionHeader
        title="Прямые трансляции и видео"
        description="Присоединяйтесь к ZeЛяве Братству на стриминговых платформах, где мы делимся опытом, проходим сложный контент и обсуждаем новости мира онлайн-игр"
      />

      {/* Табы */}
      <div className="flex justify-center mt-8 mb-12">
        <div className="bg-gray-800 p-1 rounded-lg inline-flex">
          <motion.button
            className={`px-6 py-2 rounded-md font-medium flex items-center ${
              activeTab === 'twitch' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => setActiveTab('twitch')}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <Twitch className="h-5 w-5 mr-2" />
            Twitch
          </motion.button>
          <motion.button
            className={`px-6 py-2 rounded-md font-medium flex items-center ${
              activeTab === 'youtube'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => setActiveTab('youtube')}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <Youtube className="h-5 w-5 mr-2" />
            YouTube
          </motion.button>
        </div>
      </div>

      <motion.div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {activeTab === 'twitch' &&
          twitchStreams.map((stream, index) => (
            <StreamItem key={stream.id} stream={stream} index={index} />
          ))}

        {activeTab === 'youtube' &&
          youtubeVideos.map((video, index) => (
            <VideoItem key={video.id} video={video} index={index} />
          ))}
      </motion.div>

      {/* Кнопка "Подписаться" */}
      <motion.div
        className="flex justify-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <motion.a
          href={activeTab === 'twitch' ? 'https://twitch.tv/@ZeLya' : 'https://youtube.com/@ZeLya'}
          target="_blank"
          rel="noopener noreferrer"
          className={`py-3 px-8 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
            activeTab === 'twitch'
              ? 'bg-purple-600 hover:bg-purple-500 text-white'
              : 'bg-red-600 hover:bg-red-500 text-white'
          }`}
          whileHover={{
            y: -5,
            boxShadow: `0 10px 15px -3px ${
              activeTab === 'twitch' ? 'rgba(147, 51, 234, 0.4)' : 'rgba(239, 68, 68, 0.4)'
            }`,
          }}
          whileTap={{ y: 0, boxShadow: '0 0 0 0 rgba(99, 102, 241, 0)' }}
        >
          {activeTab === 'twitch' ? (
            <>
              <Twitch className="h-5 w-5 mr-2" />
              <span>Подписаться на Twitch</span>
            </>
          ) : (
            <>
              <Youtube className="h-5 w-5 mr-2" />
              <span>Подписаться на YouTube</span>
            </>
          )}
        </motion.a>
      </motion.div>
    </Section>
  );
};

export default StreamSection;
