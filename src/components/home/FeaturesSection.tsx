'use client';

import { motion } from 'framer-motion';
import { Award, Globe, MessageSquare, Sword } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    icon: <Sword className="h-10 w-10 text-indigo-500" />,
    title: 'База знаний',
    description: 'Подробные гайды, билды классов и механики боссов для топовых онлайн-игр',
  },
  {
    icon: <Globe className="h-10 w-10 text-indigo-500" />,
    title: 'Игровые новости',
    description: 'Самые свежие обновления и анонсы из мира онлайн-игр',
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-indigo-500" />,
    title: 'Игровые чаты',
    description: 'Общайтесь с другими игроками, делитесь опытом и находите напарников',
  },
  {
    icon: <Award className="h-10 w-10 text-indigo-500" />,
    title: 'Киберспорт',
    description: 'Турниры, соревнования и призовые фонды для соревновательных игроков',
  },
];

export default function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, type: 'spring', stiffness: 100 },
    },
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Фоновые элементы */}
      <div className="absolute inset-0 bg-indigo-900/5 skew-y-3 z-0"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Всё, что нужно геймеру
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            GameHub объединяет всё необходимое для погружения в мир онлайн-игр: актуальные новости,
            подробные гайды и активное сообщество
          </motion.p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-indigo-500 transition-all duration-500 hover:shadow-lg hover:shadow-indigo-500/10 group"
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: '0 15px 30px -5px rgba(99, 102, 241, 0.2)' }}
            >
              <motion.div
                className="h-16 w-16 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4 group-hover:bg-indigo-500/30 transition-all duration-500"
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-medium mb-2 group-hover:text-indigo-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
