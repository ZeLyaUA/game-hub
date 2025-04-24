import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function NewsLoading() {
  return (
    <PageLayout title="Новости и события" description="Загрузка последних новостей...">
      <div className="min-h-[500px] flex flex-col items-center justify-center">
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-gray-400">Загружаем новости...</p>
      </div>
    </PageLayout>
  );
}
