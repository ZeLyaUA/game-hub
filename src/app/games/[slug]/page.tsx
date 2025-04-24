import PageLayout from '@/components/layout/PageLayout';
import { getGameBySlug, getGames } from '@/lib/server/gamesData';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GameDetails from './GameDetails';

// Динамические метаданные основанные на игре
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const game = await getGameBySlug(params.slug);

  if (!game) {
    return {
      title: 'Игра не найдена | ZeЛяве Братство',
      description: 'Запрашиваемая игра не найдена',
    };
  }

  return {
    title: `${game.title} | ZeЛяве Братство`,
    description: game.description,
  };
}

// Генерация статических путей для быстрой загрузки
export async function generateStaticParams() {
  const games = await getGames();

  return games.map(game => ({
    slug: game.title.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export default async function GamePage({ params }: { params: { slug: string } }) {
  const game = await getGameBySlug(params.slug);

  // Если игра не найдена, возвращаем 404
  if (!game) {
    notFound();
  }

  return (
    <PageLayout title={game.title} description={game.description}>
      <GameDetails game={game} />
    </PageLayout>
  );
}
