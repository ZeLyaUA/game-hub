export interface TwitchStream {
  id: number;
  title: string;
  thumbnail: string;
  date: string;
  viewers: number;
  duration: string;
}

export interface YoutubeVideo {
  id: number;
  title: string;
  thumbnail: string;
  date: string;
  views: number;
  duration: string;
}

export const twitchStreams: TwitchStream[] = [
  {
    id: 1,
    title: 'ODIN: Valhalla Rising - Рейд на босса "Огненный колосс"',
    thumbnail: '/banner/1200x600/banner-odin.png',
    date: '20 апреля 2025',
    viewers: 1248,
    duration: '3ч 25мин',
  },
  {
    id: 2,
    title: 'Throne and Liberty - Изучаем новую систему трансформации',
    thumbnail: '/banner/1200x600/banner-tl.jpg',
    date: '18 апреля 2025',
    viewers: 952,
    duration: '2ч 10мин',
  },
  {
    id: 3,
    title: 'Lost Ark - Гайд по новому классу "Иллюзионист"',
    thumbnail: '/banner/1200x600/banner-lostark.jpg',
    date: '15 апреля 2025',
    viewers: 1576,
    duration: '4ч 05мин',
  },
];

export const youtubeVideos: YoutubeVideo[] = [
  {
    id: 1,
    title: 'Полный гайд по классу Берсерк в ODIN: Valhalla Rising (2025)',
    thumbnail: '/banner/1200x600/banner-odin.png',
    date: '19 апреля 2025',
    views: 24853,
    duration: '18:42',
  },
  {
    id: 2,
    title: 'ТОП-5 способов фарма золота в Throne and Liberty',
    thumbnail: '/banner/1200x600/banner-odin.png',
    date: '16 апреля 2025',
    views: 19684,
    duration: '12:37',
  },
  {
    id: 3,
    title: 'Обзор нового обновления Lost Ark - Все, что нужно знать!',
    thumbnail: '/banner/1200x600/banner-odin.png',
    date: '12 апреля 2025',
    views: 31265,
    duration: '22:15',
  },
];

export const socialLinks = [
  { name: 'YouTube', icon: 'Y', url: 'https://youtube.com/@ZeLya', color: 'hover:text-red-500' },
  { name: 'Discord', icon: 'D', url: '#', color: 'hover:text-indigo-400' },
  { name: 'Twitch', icon: 'T', url: '#', color: 'hover:text-purple-500' },
  { name: 'Instagram', icon: 'I', url: '#', color: 'hover:text-pink-500' },
];
