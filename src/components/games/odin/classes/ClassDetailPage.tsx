'use client';

import { useInView } from 'react-intersection-observer';

import { ClassInfo } from './data';
import ClassHeroSection from './sections/ClassHeroSection';

type ClassDetailPageProps = {
  classInfo: ClassInfo;
};

export default function ClassDetailPage({ classInfo }: ClassDetailPageProps) {
  // Создаем хуки для анимаций при скролле
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="pt-16 bg-gray-900">
      <ClassHeroSection ref={heroRef} inView={heroInView} classInfo={classInfo} />
    </div>
  );
}
