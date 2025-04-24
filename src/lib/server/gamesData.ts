// Серверный код для получения данных об играх
import games, { Game } from '@/data/games/games-list';

// Эта функция будет вызываться только на сервере
export async function getGames(): Promise<Game[]> {
  // Имитация задержки, которая могла бы быть при реальном API-запросе
  // В реальном проекте здесь был бы запрос к базе данных или API
  await new Promise(resolve => setTimeout(resolve, 100));

  return games;
}

export async function getGameBySlug(slug: string): Promise<Game | undefined> {
  // Имитация задержки
  await new Promise(resolve => setTimeout(resolve, 100));

  // Конвертирование slug в формат для сравнения
  const normalizedSlug = slug.toLowerCase();

  // Поиск игры по slug
  return games.find(game => {
    const gameSlug = game.title.toLowerCase().replace(/\s+/g, '-');
    return gameSlug === normalizedSlug;
  });
}

export async function getFeaturedGame(): Promise<Game> {
  // Возвращаем первую игру как featured
  return games[0];
}
