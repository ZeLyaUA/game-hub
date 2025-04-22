'use client';

import { useInView } from 'react-intersection-observer';

import { ClassInfo } from './data';
import ClassCommunitySection from './sections/ClassCommunitySection';
import ClassGearSection from './sections/ClassGearSection';
import ClassGuidesSection from './sections/ClassGuidesSection';
import ClassHeroSection from './sections/ClassHeroSection';
import ClassLoreSection from './sections/ClassLoreSection';
import ClassSpecializationsSection from './sections/ClassSpecializationsSection';

type ClassDetailPageProps = {
  classInfo: ClassInfo;
};

export default function ClassDetailPage({ classInfo }: ClassDetailPageProps) {
  // Создаем хуки для анимаций при скролле
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [loreRef, loreInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [specializationsRef, specializationsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [gearRef, gearInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [guidesRef, guidesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [communityRef, communityInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="pt-16 bg-gray-900">
      <ClassHeroSection ref={heroRef} inView={heroInView} classInfo={classInfo} />
      <ClassLoreSection ref={loreRef} inView={loreInView} classInfo={classInfo} />
      <ClassSpecializationsSection
        ref={specializationsRef}
        inView={specializationsInView}
        specializations={classInfo.specializations}
      />
      <ClassGearSection ref={gearRef} inView={gearInView} gear={classInfo.recommendedGear} />
      <ClassGuidesSection ref={guidesRef} inView={guidesInView} guides={classInfo.guides} />
      <ClassCommunitySection
        ref={communityRef}
        inView={communityInView}
        className={classInfo.name}
      />
    </div>
  );
}
