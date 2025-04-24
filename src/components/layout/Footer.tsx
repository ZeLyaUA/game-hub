'use client';

import { socialLinks } from '@/data/content/streams';
import { footerSections } from '@/data/ui/navigation';
import { motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 border-t border-gray-700 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Бренд и соцсети */}
          <BrandSection />

          {/* Ссылки по секциям */}
          {footerSections.map((section, sectionIndex) => (
            <FooterNavSection key={section.title} section={section} sectionIndex={sectionIndex} />
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

function BrandSection() {
  return (
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
        лучшие гайды и новости, чтобы ваш игровой опыт был максимально комфортным и увлекательным.
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
  );
}

interface FooterNavSectionProps {
  section: {
    title: string;
    links: {
      name: string;
      url: string;
    }[];
  };
  sectionIndex: number;
}

function FooterNavSection({ section, sectionIndex }: FooterNavSectionProps) {
  return (
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
            <Link href={link.url} className="text-gray-400 hover:text-indigo-400 transition-colors">
              {link.name}
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
