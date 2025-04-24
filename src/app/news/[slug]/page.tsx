import PageLayout from '@/components/layout/PageLayout';
import { getArticleBySlug, getNews } from '@/lib/server/newsData';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleView from './ArticleView';

// Динамические метаданные на основе статьи
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: 'Статья не найдена | ZeЛяве Братство',
      description: 'Запрашиваемая статья не найдена',
    };
  }

  return {
    title: `${article.title} | ZeЛяве Братство`,
    description: article.excerpt,
  };
}

// Генерация статических путей для быстрой загрузки
export async function generateStaticParams() {
  const articles = await getNews();

  return articles.map(article => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);

  // Если статья не найдена, возвращаем 404
  if (!article) {
    notFound();
  }

  // Получаем также последние статьи для блока "Читайте также"
  const latestArticles = await getNews();
  const relatedArticles = latestArticles.filter(a => a.id !== article.id).slice(0, 3);

  return (
    <PageLayout title={article.title}>
      <ArticleView article={article} relatedArticles={relatedArticles} />
    </PageLayout>
  );
}
