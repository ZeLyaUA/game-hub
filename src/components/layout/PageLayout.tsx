// Это серверный компонент (без 'use client')
import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export default function PageLayout({ children, title, description }: PageLayoutProps) {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {title}
          </h1>
          {description && <p className="text-gray-300 mb-8">{description}</p>}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
