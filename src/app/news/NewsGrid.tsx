'use client';

import NewsItem from '@/components/news/NewsItem';
import { NewsArticle } from '@/data/content/news';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface NewsGridProps {
  initialNews: NewsArticle[];
}

export default function NewsGrid({ initialNews }: NewsGridProps) {
  const [news] = useState<NewsArticle[]>(initialNews);
  const [category, setCategory] = useState<string | null>(null);

  // Фильтрация новостей по категории
  const filteredNews = category ? news.filter(article => article.category === category) : news;

  // Получение уникальных категорий из новостей
  const categories = Array.from(new Set(news.map(article => article.category)));

  return (
    <div>
      {/* Фильтры по категориям */}
      <div className="mb-8 flex flex-wrap gap-2">
        <CategoryButton active={category === null} onClick={() => setCategory(null)}>
          Все новости
        </CategoryButton>

        {categories.map(cat => (
          <CategoryButton key={cat} active={category === cat} onClick={() => setCategory(cat)}>
            {cat}
          </CategoryButton>
        ))}
      </div>

      {/* Сетка новостей */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {filteredNews.map((article, index) => (
          <NewsItem key={article.id} article={article} index={index} />
        ))}

        {filteredNews.length === 0 && (
          <div className="col-span-3 text-center py-10">
            <p className="text-gray-400">Новости не найдены. Попробуйте другой фильтр.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

interface CategoryButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

function CategoryButton({ children, active, onClick }: CategoryButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
      }`}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      {children}
    </motion.button>
  );
}
