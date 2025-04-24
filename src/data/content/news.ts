export interface NewsArticle {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  readTime: string;
  category: 'Новости' | 'Гайды' | 'Киберспорт' | 'Обновления';
  slug: string;
}

export const news: NewsArticle[] = [
  {
    id: 1,
    title: 'Анонс нового обновления для ODIN: Valhalla Rising',
    date: '20 апреля 2025',
    image: '/banner/1200x600/banner-odin.png',
    excerpt:
      'Разработчики анонсировали крупное обновление, которое добавит новую зону "Огненные земли" и рейдового босса.',
    readTime: '4 мин',
    category: 'Новости',
    slug: 'odin-update-announcement',
  },
  {
    id: 2,
    title: 'Гайд: Лучшие сборки для берсерка в ODIN',
    date: '18 апреля 2025',
    image: '/banner/1200x600/banner-tl.jpg',
    excerpt:
      'Подробный разбор оптимальных билдов берсерка для PvP и PvE контента после последнего патча.',
    readTime: '8 мин',
    category: 'Гайды',
    slug: 'odin-berserker-builds',
  },
  {
    id: 3,
    title: 'Турнир по ODIN с призовым фондом $10,000',
    date: '15 апреля 2025',
    image: '/banner/1200x600/banner-lostark.jpg',
    excerpt: 'Официальный турнир по PvP 3x3 стартует в следующем месяце. Регистрация уже открыта!',
    readTime: '3 мин',
    category: 'Киберспорт',
    slug: 'odin-tournament-announcement',
  },
];

export default news;
