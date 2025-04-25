// src/app/page.tsx
import { getGames } from '@/app/actions/games';
import { GameWithIcon } from '@/types/game';
import { Clock, Gamepad2, Swords } from 'lucide-react';
import HomeClient from './HomeClient';

export const dynamic = 'force-dynamic';

// Маппинг иконок для игр
const gameIcons: Record<string, React.ReactNode> = {
  odin: <Swords className="w-6 h-6" />,
  chrono: <Clock className="w-6 h-6" />,
  archeage: <Gamepad2 className="w-6 h-6" />,
  default: <Gamepad2 className="w-6 h-6" />,
};

function getGameIcon(gameId: string): React.ReactNode {
  return gameIcons[gameId] ?? gameIcons.default;
}

export default async function HomePage() {
  const games = await getGames();

  // Добавляем иконки к играм
  const gamesWithIcons: GameWithIcon[] = games.map(game => ({
    ...game,
    icon: getGameIcon(game.id),
  }));

  return <HomeClient games={gamesWithIcons} />;
}
