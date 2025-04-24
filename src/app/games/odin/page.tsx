import { getGameBySlug } from '@/lib/server/gamesData';
import { getOdinData } from '@/lib/server/odinData';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import OdinPage from './OdinPageContent';

export async function generateMetadata(): Promise<Metadata> {
  const game = await getGameBySlug('odin-valhalla-rising');

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

export default async function OdinPageServer() {
  const game = await getGameBySlug('odin-valhalla-rising');

  if (!game) {
    notFound();
  }

  // Получаем специфичные данные для ODIN
  const { classes, database } = await getOdinData();

  return <OdinPage game={game} classes={classes} database={database} />;
}
