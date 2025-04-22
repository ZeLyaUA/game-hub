'use client';

import { motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'YouTube', icon: 'Y', url: 'https://youtube.com/@ZeLya', color: 'hover:text-red-500' },
    { name: 'Discord', icon: 'D', url: '#', color: 'hover:text-indigo-400' },
    { name: 'Twitch', icon: 'T', url: '#', color: 'hover:text-purple-500' },
    { name: 'Instagram', icon: 'I', url: '#', color: 'hover:text-pink-500' },
  ];

  const sections = [
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

  return (
    <footer className="bg-gray-800 border-t border-gray-700 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Бренд и соцсети */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center mb-6 group">
              <Gamepad2 className="h-8 w-8 text-indigo-500 group-hover:text-indigo-400 transition-colors" />
              <div className="ml-2">
                <div className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                  ZeЛяве
                </div>
                <div className="text-xs text-gray-400">Братство</div>
              </div>
            </Link>

            <p className="text-gray-400 mb-6 max-w-md">
              Ваш портал в мир онлайн игр. Мы объединяем игроков, создаем сообщество и предоставляем
              лучшие гайды и новости, чтобы ваш игровой опыт был максимально комфортным и
              увлекательным.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${link.color} transition-colors p-2 rounded-full bg-gray-700 hover:bg-gray-600 w-8 h-8 flex items-center justify-center font-bold`}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ y: 0, scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Ссылки по секциям */}
          {sections.map((section, sectionIndex) => (
            <div key={section.title}>
              <h3 className="font-medium text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * (linkIndex + sectionIndex * 5), duration: 0.3 }}
                  >
                    <Link
                      href={link.url}
                      className="text-gray-400 hover:text-indigo-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} ZeЛяве Братство. Все права защищены.
          </p>

          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-500 hover:text-indigo-400 transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-indigo-400 transition-colors">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
