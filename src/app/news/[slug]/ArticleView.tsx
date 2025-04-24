'use client';

import { Button } from '@/components/ui/Button';
import { NewsArticle } from '@/data/content/news';
import { motion } from 'framer-motion';
import { ChevronLeft, Clock, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ArticleViewProps {
  article: NewsArticle;
  relatedArticles: NewsArticle[];
}

export default function ArticleView({ article, relatedArticles }: ArticleViewProps) {
  // Для демонстрации, создадим полный текст статьи, так как в модели данных у нас есть только excerpt
  const fullText = `
    ${article.excerpt}
    
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis euismod, 
    aliquam nisl eget, tincidunt nisl. Nulla facilisi. Sed euismod, nisl eget aliquam 
    tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam eget 
    felis euismod, aliquam nisl eget, tincidunt nisl.
    
    Nulla facilisi. Sed euismod, nisl eget aliquam tincidunt, nisl nisl aliquam nisl, 
    eget aliquam nisl nisl eget nisl. Nullam eget felis euismod, aliquam nisl eget, 
    tincidunt nisl. Nulla facilisi. Sed euismod, nisl eget aliquam tincidunt, nisl nisl 
    aliquam nisl, eget aliquam nisl nisl eget nisl.
    
    Nulla facilisi. Sed euismod, nisl eget aliquam tincidunt, nisl nisl aliquam nisl, 
    eget aliquam nisl nisl eget nisl. Nullam eget felis euismod, aliquam nisl eget, 
    tincidunt nisl. Nulla facilisi.
  `;

  const paragraphs = fullText.split('\n\n').filter(p => p.trim());

  return (
    <div className="space-y-8">
      {/* Навигация */}
      <div className="mb-6">
        <Link href="/news">
          <motion.div
            className="flex items-center text-gray-400 hover:text-white transition-colors"
            whileHover={{ x: -5 }}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            <span>Назад к новостям</span>
          </motion.div>
        </Link>
      </div>

      {/* Верхняя информация о статье */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
        <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-medium">
          {article.category}
        </span>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          <span>{article.readTime}</span>
        </div>
        <span>{article.date}</span>
      </div>

      {/* Изображение статьи */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-xl mb-8">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
      </div>

      {/* Контент статьи */}
      <div className="max-w-3xl mx-auto">
        <article className="prose prose-invert prose-lg max-w-none">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </article>

        {/* Кнопки действий */}
        <div className="flex justify-between items-center border-t border-b border-gray-700 py-4 my-8">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" icon={Share2}>
              Поделиться
            </Button>
          </div>

          <div className="text-sm text-gray-400">Просмотров: 237</div>
        </div>

        {/* Связанные статьи */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6">Читайте также</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map(relatedArticle => (
                <RelatedArticleCard key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface RelatedArticleCardProps {
  article: NewsArticle;
}

function RelatedArticleCard({ article }: RelatedArticleCardProps) {
  return (
    <Link href={`/news/${article.slug}`}>
      <motion.div
        className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors"
        whileHover={{ y: -5 }}
      >
        <div className="relative h-40 w-full">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
          />
        </div>
        <div className="p-4">
          <h4 className="font-medium text-lg line-clamp-2 mb-1">{article.title}</h4>
          <div className="text-sm text-gray-400 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{article.readTime}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
