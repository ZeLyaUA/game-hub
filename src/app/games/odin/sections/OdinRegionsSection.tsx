'use client';

import { Section, SectionHeader } from '@/components/ui/Section';
import { RegionInfo } from '@/data/games/odin/database';
import { motion } from 'framer-motion';
import { ChevronRight, Map, MapPin, Shield, Sword } from 'lucide-react';
import { forwardRef, useState } from 'react';

interface OdinRegionsSectionProps {
  inView: boolean;
  regions: RegionInfo[];
}

const OdinRegionsSection = forwardRef<HTMLElement, OdinRegionsSectionProps>(
  ({ inView, regions }, ref) => {
    const [selectedRegion, setSelectedRegion] = useState<string>(regions[0]?.id || '');

    const typeBadgeColors: Record<string, string> = {
      PvE: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      PvP: 'bg-red-500/20 text-red-400 border-red-500/30',
      Mixed: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    };

    const getRegionIcon = (type: string) => {
      switch (type) {
        case 'PvE':
          return <Shield className="h-5 w-5 text-blue-400" />;
        case 'PvP':
          return <Sword className="h-5 w-5 text-red-400" />;
        default:
          return <Shield className="h-5 w-5 text-purple-400" />;
      }
    };

    const currentRegion = regions.find(r => r.id === selectedRegion) || regions[0];

    return (
      <Section className="relative overflow-hidden bg-gray-800/50" ref={ref}>
        <SectionHeader
          title="Регионы"
          description="Исследуйте обширный мир ODIN: Valhalla Rising"
          withAnimation={inView}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Список регионов */}
          <motion.div
            className="md:col-span-1 space-y-3"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-semibold text-lg mb-4">Выберите регион</h3>
            {regions.map((region, index) => (
              <motion.div
                key={region.id}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 border ${
                  selectedRegion === region.id
                    ? 'bg-indigo-500/10 border-indigo-500/40'
                    : 'bg-gray-800/80 border-gray-700/50 hover:border-indigo-500/20'
                }`}
                onClick={() => setSelectedRegion(region.id)}
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="flex items-center">
                  <div className="mr-3">{getRegionIcon(region.type)}</div>
                  <div className="flex-1">
                    <h4
                      className={`font-medium ${
                        selectedRegion === region.id ? 'text-indigo-400' : ''
                      }`}
                    >
                      {region.name}
                    </h4>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-400 mr-2">Уровень: {region.level}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full text-center ${
                          typeBadgeColors[region.type]
                        }`}
                      >
                        {region.type}
                      </span>
                    </div>
                  </div>
                  <ChevronRight
                    className={`h-5 w-5 ${
                      selectedRegion === region.id ? 'text-indigo-400' : 'text-gray-500'
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Детали выбранного региона */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            key={currentRegion.id}
          >
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700">
              {/* Изображение региона */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={currentRegion.image || '/regions/default.jpg'}
                  alt={currentRegion.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      typeBadgeColors[currentRegion.type]
                    }`}
                  >
                    {currentRegion.type}
                  </span>
                </div>
              </div>

              {/* Детали региона */}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 text-indigo-400 mr-2" />
                  <h3 className="text-xl font-bold">{currentRegion.name}</h3>
                </div>

                <p className="text-gray-300 mb-6">{currentRegion.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-400 mb-1">
                        {currentRegion.bosses}
                      </div>
                      <div className="text-sm text-gray-400">Боссы</div>
                    </div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-400 mb-1">
                        {currentRegion.dungeons}
                      </div>
                      <div className="text-sm text-gray-400">Подземелья</div>
                    </div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-400 mb-1">
                        {currentRegion.quests}
                      </div>
                      <div className="text-sm text-gray-400">Задания</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Map className="h-5 w-5 text-indigo-400 mr-2" />
                  <span className="text-sm">
                    Рекомендуемый уровень:{' '}
                    <span className="font-semibold">{currentRegion.level}</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    );
  }
);

OdinRegionsSection.displayName = 'OdinRegionsSection';

export default OdinRegionsSection;
