// Это серверный компонент (без 'use client')
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Новости | ZeЛяве Братство',
  description: 'Последние новости, обновления и анонсы из мира онлайн-игр',
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-900">
      {/* Здесь могут быть элементы, общие для всех страниц раздела Новости */}
      {children}
    </div>
  );
}
