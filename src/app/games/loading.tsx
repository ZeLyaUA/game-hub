import PageLayout from '@/components/layout/PageLayout';

export default function GamesLoading() {
  // Создаем массив из 6 элементов для скелетона карточек игр
  const skeletonCards = Array(6).fill(null);

  return (
    <PageLayout title="Каталог игр" description="Загрузка каталога игр...">
      <div className="mb-8 flex flex-wrap gap-2">
        {/* Скелетоны кнопок фильтров */}
        <div className="h-10 w-24 bg-gray-800 animate-pulse rounded-lg"></div>
        <div className="h-10 w-20 bg-gray-800 animate-pulse rounded-lg"></div>
        <div className="h-10 w-28 bg-gray-800 animate-pulse rounded-lg"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skeletonCards.map((_, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 animate-pulse"
          >
            {/* Скелетон изображения */}
            <div className="h-48 bg-gray-700"></div>

            {/* Скелетон текста */}
            <div className="p-4">
              <div className="h-6 bg-gray-700 rounded-md w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-700 rounded-md mb-4"></div>
              <div className="flex gap-2 mb-4">
                <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
                <div className="h-6 w-24 bg-gray-700 rounded-full"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-24 bg-gray-700 rounded-md"></div>
                <div className="h-4 w-12 bg-gray-700 rounded-md"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
