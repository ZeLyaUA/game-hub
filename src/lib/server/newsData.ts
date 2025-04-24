// Серверный код для получения данных о новостях
import news, { NewsArticle } from '@/data/content/news';

// Получить все новости
export async function getNews(): Promise<NewsArticle[]> {
  // Имитация API запроса
  await new Promise(resolve => setTimeout(resolve, 100));
  return news;
}

// Получить новость по слагу
export async function getArticleBySlug(slug: string): Promise<NewsArticle | undefined> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return news.find(article => article.slug === slug);
}

// Получить самые последние новости (ограниченный набор)
export async function getLatestNews(limit: number = 3): Promise<NewsArticle[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return news.slice(0, limit);
}

// Получить новости по категории
export async function getNewsByCategory(category: string): Promise<NewsArticle[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return news.filter(article => article.category === category);
}
