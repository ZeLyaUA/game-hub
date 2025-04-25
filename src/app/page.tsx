import { getGames } from '@/app/actions/games';
import { Clock, Gamepad2, Swords } from 'lucide-react';
import HomeClient from './HomeClient';

export const dynamic = 'force-dynamic';

// Маппинг иконок для игр
const gameIcons = {
  odin: <Swords className="w-6 h-6" />,
  chrono: <Clock className="w-6 h-6" />,
  archeage: <Gamepad2 className="w-6 h-6" />,
  default: <Gamepad2 className="w-6 h-6" />,
};

export default async function HomePage() {
  const games = await getGames();

  // Добавляем иконки к играм
  const gamesWithIcons = games.map(game => ({
    ...game,
    icon: gameIcons[game.id as keyof typeof gameIcons] || gameIcons.default,
  }));

  return <HomeClient games={gamesWithIcons} />;
}
