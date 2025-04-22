import ClassesList from '@/components/games/odin/classes/ClassesList';
import { classData } from '@/components/games/odin/classes/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Классы | ODIN: Valhalla Rising',
  description:
    'Изучите все классы персонажей в ODIN: Valhalla Rising. Воин, Чародейка, Разбойник и Жрец - каждый со своими уникальными специализациями и умениями.',
};

export default function ClassesPage() {
  return <ClassesList classes={classData} />;
}
