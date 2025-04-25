// src/app/page.tsx
import { IGameService } from '@/domain/services/game.service';
import { getServerContainer } from '@/infrastructure/di/getServerContainer';
import HomeClient from './HomeClient';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const container = getServerContainer();
  const gameService = container.resolve<IGameService>('GameService');

  const { games } = await gameService.getGames();

  return <HomeClient games={games} />;
}
