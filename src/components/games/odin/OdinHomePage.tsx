// components/games/odin/OdinHomePage.tsx
'use client';

import { useInView } from 'react-intersection-observer';

import { OdinClassesSection, OdinDatabaseSection, OdinHeroSection } from './sections';

export default function OdinHomePage() {
  // Создаем хуки для анимаций при скролле
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [classesRef, classesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [databaseRef, databaseInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="pt-16">
      <OdinHeroSection ref={heroRef} inView={heroInView} />
      <OdinDatabaseSection ref={databaseRef} inView={databaseInView} />
      <OdinClassesSection ref={classesRef} inView={classesInView} />
    </div>
  );
}
