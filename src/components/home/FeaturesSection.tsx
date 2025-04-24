'use client';

import { Section, SectionHeader } from '@/components/ui/Section';
import { useFeatures } from '@/hooks/useData';
import useIntersection from '@/hooks/useIntersection';
import { motion } from 'framer-motion';
import FeatureItem from './FeatureItem';

export default function FeaturesSection() {
  const [ref, inView] = useIntersection({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { features, isLoading } = useFeatures();

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
      <Section className="min-h-[400px]">
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Section>
    );
  }

  return (
    <Section className="relative overflow-hidden">
      {/* Фоновые элементы */}
      <div className="absolute inset-0 bg-indigo-900/5 skew-y-3 z-0"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <SectionHeader
        title="Всё, что нужно геймеру"
        description="GameHub объединяет всё необходимое для погружения в мир онлайн-игр: актуальные новости, подробные гайды и активное сообщество"
      />

      <motion.div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {features.map((feature, index) => (
          <FeatureItem key={feature.id} feature={feature} index={index} />
        ))}
      </motion.div>
    </Section>
  );
}
