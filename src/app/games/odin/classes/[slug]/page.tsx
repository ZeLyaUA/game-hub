import { getOdinClassBySlug } from '@/lib/server/odinData';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ClassDetail from './ClassDetail';

interface ClassPageParams {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ClassPageParams): Promise<Metadata> {
  const classInfo = await getOdinClassBySlug(params.slug);

  if (!classInfo) {
    return {
      title: 'Класс не найден | ODIN: Valhalla Rising',
      description: 'Запрашиваемая информация о классе не найдена',
    };
  }

  return {
    title: `${classInfo.name} | ODIN: Valhalla Rising`,
    description: classInfo.description,
  };
}

export default async function ClassPage({ params }: ClassPageParams) {
  const classInfo = await getOdinClassBySlug(params.slug);

  if (!classInfo) {
    notFound();
  }

  return <ClassDetail classInfo={classInfo} />;
}
