'use client';

import { Game } from '@/data/games/games-list';
import { OdinClassInfo } from '@/data/games/odin/classes';
import { BossInfo, DatabaseSection, RegionInfo } from '@/data/games/odin/database';
import useIntersection from '@/hooks/useIntersection';
import { useState } from 'react';
import OdinBossesSection from './sections/OdinBossesSection';
import OdinClassesSection from './sections/OdinClassesSection';
import OdinDatabaseSection from './sections/OdinDatabaseSection';
import OdinHeroSection from './sections/OdinHeroSection';
import OdinNavigation from './sections/OdinNavigation';
import OdinOverviewSection from './sections/OdinOverviewSection';
import OdinRegionsSection from './sections/OdinRegionsSection';

interface OdinPageProps {
  game: Game;
  classes: OdinClassInfo[];
  database: {
    databaseSections: DatabaseSection[];
    regions: RegionInfo[];
    bosses: BossInfo[];
  };
}

export default function OdinPage({ game, classes, database }: OdinPageProps) {
  const [activeSection, setActiveSection] = useState('overview');

  // Хуки для анимаций при скролле
  const [heroRef, heroInView] = useIntersection({ triggerOnce: true, threshold: 0.1 });
  const [overviewRef, overviewInView] = useIntersection({ triggerOnce: true, threshold: 0.1 });
  const [classesRef, classesInView] = useIntersection({ triggerOnce: true, threshold: 0.1 });
  const [regionsRef, regionsInView] = useIntersection({ triggerOnce: true, threshold: 0.1 });
  const [databaseRef, databaseInView] = useIntersection({ triggerOnce: true, threshold: 0.1 });
  const [bossesRef, bossesInView] = useIntersection({ triggerOnce: true, threshold: 0.1 });

  const handleNavigationClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-16 bg-gray-900">
      {/* Hero Section */}
      <OdinHeroSection ref={heroRef} inView={heroInView} game={game} />

      {/* Navigation */}
      <OdinNavigation activeSection={activeSection} onNavigationClick={handleNavigationClick} />

      {/* Секции контента */}
      <div id="overview">
        <OdinOverviewSection ref={overviewRef} inView={overviewInView} game={game} />
      </div>

      <div id="classes">
        <OdinClassesSection ref={classesRef} inView={classesInView} classes={classes} />
      </div>

      <div id="regions">
        <OdinRegionsSection ref={regionsRef} inView={regionsInView} regions={database.regions} />
      </div>

      <div id="database">
        <OdinDatabaseSection
          ref={databaseRef}
          inView={databaseInView}
          databaseSections={database.databaseSections}
        />
      </div>

      <div id="bosses">
        <OdinBossesSection ref={bossesRef} inView={bossesInView} bosses={database.bosses} />
      </div>
    </div>
  );
}
