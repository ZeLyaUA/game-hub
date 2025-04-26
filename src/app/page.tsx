// src/app/page.tsx
import { getServerContainer } from '@/infrastructure/di/getServerContainer';
import HomeClient from './HomeClient';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const container = getServerContainer();
  const gameService = container.resolve('GameService');

  const { games } = await gameService.getGames();

  return <HomeClient games={games} />;
}
