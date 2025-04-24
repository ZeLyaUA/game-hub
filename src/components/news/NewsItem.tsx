'use client';

import { NewsArticle } from '@/data/content/news';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface NewsItemProps {
  article: NewsArticle;
  index: number;
}

export default function NewsItem({ article, index }: NewsItemProps) {
  return (
    <motion.div
      className="bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 group"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, type: 'spring', delay: index * 0.1 },
        },
      }}
      whileHover={{ y: -10, boxShadow: '0 15px 30px -5px rgba(99, 102, 241, 0.2)' }}
    >
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7 }}
        />
        <div className="absolute top-3 left-3 bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-medium">
          {article.category}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
      </div>

      <div className="p-5">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>{article.date}</span>
          <span>{article.readTime}</span>
        </div>
        <motion.h3 className="font-bold text-lg mb-3 group-hover:text-indigo-400 transition-colors duration-300 line-clamp-2">
          {article.title}
        </motion.h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
        <Link href={`/news/${article.slug}`}>
          <motion.div
            className="inline-flex items-center text-indigo-400 hover:text-indigo-300 text-sm font-medium group"
            whileHover={{ x: 5 }}
          >
            <span>Читать далее</span>
            <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}
