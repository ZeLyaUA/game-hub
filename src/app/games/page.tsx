import PageLayout from '@/components/layout/PageLayout';
import { getGames } from '@/lib/server/gamesData';
import GamesGrid from './GamesGrid';

// Метаданные страницы для SEO
export const metadata = {
  title: 'Игры | ZeЛяве Братство',
  description: 'Каталог популярных онлайн-игр с гайдами, новостями и сообществом',
};

export default async function GamesPage() {
  // Получение данных на сервере
  const games = await getGames();

  return (
    <PageLayout
      title="Каталог игр"
      description="Исследуйте популярные MMORPG и другие онлайн-игры, изучайте гайды и присоединяйтесь к сообществу"
    >
      {/* Передаем данные в клиентский компонент для интерактивности */}
      <GamesGrid initialGames={games} />
    </PageLayout>
  );
}
