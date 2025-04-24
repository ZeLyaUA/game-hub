import PageLayout from '@/components/layout/PageLayout';
import { getNews } from '@/lib/server/newsData';
import NewsGrid from './NewsGrid';

export default async function NewsPage() {
  // Получение данных на сервере
  const news = await getNews();

  return (
    <PageLayout
      title="Новости и события"
      description="Самые последние новости, обновления и события из мира онлайн-игр"
    >
      <NewsGrid initialNews={news} />
    </PageLayout>
  );
}
