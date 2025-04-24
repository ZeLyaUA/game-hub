'use client';

import { Feature } from '@/data/content/features';
import { motion } from 'framer-motion';
import { Award, Globe, MessageSquare, Sword } from 'lucide-react';

interface FeatureItemProps {
  feature: Feature;
  index: number;
}

// Компонент который преобразует идентификатор иконки в соответствующий компонент
const FeatureIcon = ({ iconType }: { iconType: Feature['iconType'] }) => {
  const iconProps = { className: 'h-10 w-10 text-indigo-500' };

  switch (iconType) {
    case 'sword':
      return <Sword {...iconProps} />;
    case 'globe':
      return <Globe {...iconProps} />;
    case 'message-square':
      return <MessageSquare {...iconProps} />;
    case 'award':
      return <Award {...iconProps} />;
    default:
      return null;
  }
};

export default function FeatureItem({ feature, index }: FeatureItemProps) {
  return (
    <motion.div
      className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-indigo-500 transition-all duration-500 hover:shadow-lg hover:shadow-indigo-500/10 group"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, type: 'spring', stiffness: 100, delay: index * 0.1 },
        },
      }}
      whileHover={{ y: -10, boxShadow: '0 15px 30px -5px rgba(99, 102, 241, 0.2)' }}
    >
      <motion.div
        className="h-16 w-16 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4 group-hover:bg-indigo-500/30 transition-all duration-500"
        whileHover={{ rotate: 5, scale: 1.05 }}
      >
        <FeatureIcon iconType={feature.iconType} />
      </motion.div>
      <h3 className="text-xl font-medium mb-2 group-hover:text-indigo-400 transition-colors duration-300">
        {feature.title}
      </h3>
      <p className="text-gray-400">{feature.description}</p>
    </motion.div>
  );
}
