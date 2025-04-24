export interface Game {
  id: number;
  title: string;
  banner: string;
  logo: string;
  description: string;
  onlineCount: number;
  tags: string[];
  rating: number;
  highlight?: string;
}

export const games: Game[] = [
  {
    id: 1,
    title: 'ODIN Valhalla Rising',
    banner: '/banner/1200x600/banner-odin.png',
    logo: '/odin-logo.webp',
    description: 'Погрузитесь в скандинавский мир MMORPG с открытым миром и потрясающей графикой',
    onlineCount: 25438,
    tags: ['MMORPG', 'Викинги', 'Открытый мир'],
    rating: 4.5,
    highlight: 'Новое обновление: Огненные земли',
  },
  {
    id: 2,
    title: 'Throne and Liberty',
    banner: '/banner/1200x600/banner-tl.jpg',
    logo: '/throneandliberty-logo.png',
    description: 'Фэнтезийная MMORPG с акцентом на трансформацию персонажей и динамичные бои',
    onlineCount: 17863,
    tags: ['MMORPG', 'Фэнтези', 'PvP'],
    rating: 4.3,
    highlight: 'Скоро ЗБТ 2.0',
  },
  {
    id: 3,
    title: 'Lost Ark',
    banner: '/banner/1200x600/banner-lostark.jpg',
    logo: '/lostark-logo.png',
    description: 'Изометрическая MMORPG с быстрыми боями и множеством классов',
    onlineCount: 32105,
    tags: ['MMORPG', 'Изометрия', 'Рейды'],
    rating: 4.6,
    highlight: 'Новый класс доступен',
  },
];

export default games;
