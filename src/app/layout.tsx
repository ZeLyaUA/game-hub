import { Inter, Orbitron, Rajdhani } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });
const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});
const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
});

export const metadata = {
  title: 'ZeЛяве - Zone Experience Live | MMO портал',
  description:
    'Новости, гайды и сообщество для игроков MMORPG. Zone Experience Live - твой гид по игровым мирам.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${inter.className} ${orbitron.variable} ${rajdhani.variable} min-h-screen`}
        data-theme="dark"
      >
        {children}
      </body>
    </html>
  );
}
