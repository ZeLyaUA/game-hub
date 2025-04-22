// components/games/odin/OdinHomePage.tsx
'use client';

import { useInView } from 'react-intersection-observer';

import {
  OdinClassesSection,
  OdinCommunitySection,
  OdinDatabaseSection,
  OdinDownloadSection,
  OdinGameSystemsSection,
  OdinHeroSection,
  OdinNewsSection,
} from './sections';

export default function OdinHomePage() {
  // Создаем хуки для анимаций при скролле
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [classesRef, classesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [databaseRef, databaseInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [newsRef, newsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [systemsRef, systemsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [communityRef, communityInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [downloadRef, downloadInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="pt-16">
      <OdinHeroSection ref={heroRef} inView={heroInView} />
      <OdinClassesSection ref={classesRef} inView={classesInView} />
      <OdinDatabaseSection ref={databaseRef} inView={databaseInView} />
      <OdinNewsSection ref={newsRef} inView={newsInView} />
      <OdinGameSystemsSection ref={systemsRef} inView={systemsInView} />
      <OdinCommunitySection ref={communityRef} inView={communityInView} />
      <OdinDownloadSection ref={downloadRef} inView={downloadInView} />
    </div>
  );
}
