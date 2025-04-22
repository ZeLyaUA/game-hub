'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { roleColors } from '@/utils/colorMapping';
import { ClassArchetype } from '../data';

type ArchetypeSelectorProps = {
  archetypes: ClassArchetype[];
  onChange: (archetype: ClassArchetype) => void;
  activeArchetype: ClassArchetype;
};

const ArchetypeSelector: React.FC<ArchetypeSelectorProps> = ({
  archetypes,
  onChange,
  activeArchetype,
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-indigo-400">Выберите архетип</h3>

      <div className="flex flex-wrap gap-4">
        {archetypes.map(archetype => (
          <motion.div
            key={archetype.id}
            className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
              activeArchetype.id === archetype.id
                ? 'bg-indigo-900/30 border-indigo-500 shadow-lg shadow-indigo-500/10'
                : 'bg-gray-700/50 border-gray-600 hover:border-indigo-500/50'
            }`}
            onClick={() => onChange(archetype)}
            whileHover={{ y: -5 }}
            whileTap={{ y: 0 }}
          >
            <div className="flex-shrink-0 mr-3 relative w-12 h-12 rounded overflow-hidden">
              <Image
                src={archetype.icon}
                alt={archetype.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div>
              <h4
                className={`font-medium ${
                  activeArchetype.id === archetype.id ? 'text-indigo-400' : 'text-white'
                }`}
              >
                {archetype.name}
              </h4>
              <span
                className={`text-xs px-2 py-0.5 rounded-full border ${roleColors[archetype.role]}`}
              >
                {archetype.role}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ArchetypeSelector;
