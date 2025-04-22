import ClassDetailPage from '@/components/games/odin/classes/ClassDetailPage';
import { classData } from '@/components/games/odin/classes/data';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type ClassPageProps = {
  params: {
    className: string;
  };
};

export async function generateMetadata({ params }: ClassPageProps): Promise<Metadata> {
  const className = decodeURIComponent(params.className);
  const classInfo = classData.find(c => c.slug === className);

  if (!classInfo) {
    return {
      title: 'Класс не найден | ODIN: Valhalla Rising',
    };
  }

  return {
    title: `${classInfo.name} - Класс | ODIN: Valhalla Rising`,
    description: `Информация о классе ${classInfo.name} в ODIN: Valhalla Rising. Специализации, умения, гайды и рекомендуемое снаряжение.`,
  };
}

export async function generateStaticParams() {
  return classData.map(classInfo => ({
    className: classInfo.slug,
  }));
}

export default function ClassPage({ params }: ClassPageProps) {
  const className = decodeURIComponent(params.className);
  const classInfo = classData.find(c => c.slug === className);

  if (!classInfo) {
    notFound();
  }

  return <ClassDetailPage classInfo={classInfo} />;
}
