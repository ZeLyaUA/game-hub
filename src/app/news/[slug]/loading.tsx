import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function ArticleLoading() {
  return (
    <PageLayout title="Загрузка статьи...">
      <div className="space-y-8">
        {/* Скелетон для изображения */}
        <div className="relative w-full h-64 md:h-96 bg-gray-800 animate-pulse rounded-xl mb-8"></div>

        {/* Скелетон для контента */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            <div className="h-6 bg-gray-800 animate-pulse rounded-md w-2/3"></div>
            <div className="h-6 bg-gray-800 animate-pulse rounded-md"></div>
            <div className="h-6 bg-gray-800 animate-pulse rounded-md"></div>
            <div className="h-6 bg-gray-800 animate-pulse rounded-md w-3/4"></div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="h-6 bg-gray-800 animate-pulse rounded-md"></div>
            <div className="h-6 bg-gray-800 animate-pulse rounded-md"></div>
            <div className="h-6 bg-gray-800 animate-pulse rounded-md w-2/3"></div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <LoadingSpinner />
        </div>
      </div>
    </PageLayout>
  );
}
