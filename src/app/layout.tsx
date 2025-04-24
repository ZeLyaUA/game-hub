import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata = {
  title: 'GameHub - Портал для игрового сообщества',
  description: 'Новости, гайды и сообщество для игроков MMORPG и других онлайн-игр',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} min-h-screen`} data-theme="dark">
        {children}
      </body>
    </html>
  );
}
