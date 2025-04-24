import { LucideIcon } from 'lucide-react';

export interface NavLink {
  name: string;
  path: string;
  id: string;
}

export interface NavLinkWithIcon extends NavLink {
  icon: LucideIcon;
}

export const navLinks: NavLink[] = [
  { name: 'Игры', path: '/games', id: 'games' },
  { name: 'Новости', path: '/news', id: 'news' },
  { name: 'Гайды', path: '/guides', id: 'guides' },
  { name: 'Чаты', path: '/social', id: 'social' },
];

export const footerSections = [
  {
    title: 'Навигация',
    links: [
      { name: 'Главная', url: '/' },
      { name: 'Игры', url: '/games' },
      { name: 'Новости', url: '/news' },
      { name: 'Гайды', url: '/guides' },
      { name: 'Чаты', url: '/social' },
    ],
  },
  {
    title: 'Игры',
    links: [
      { name: 'ODIN: Valhalla Rising', url: '/games/odin' },
      { name: 'Throne and Liberty', url: '/games/throne-liberty' },
      { name: 'Lost Ark', url: '/games/lost-ark' },
      { name: 'Все игры', url: '/games' },
    ],
  },
  {
    title: 'Братство',
    links: [
      { name: 'О нас', url: '/about' },
      { name: 'Наша команда', url: '/team' },
      { name: 'Вступить', url: '/join' },
      { name: 'Поддержать', url: '/support' },
    ],
  },
];
