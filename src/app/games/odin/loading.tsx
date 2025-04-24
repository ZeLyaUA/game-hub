import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function OdinLoading() {
  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-4">
        {/* Герой-секция скелетон */}
        <div className="relative min-h-[70vh] flex items-center justify-center">
          <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-xl w-full max-w-3xl animate-pulse">
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-gray-700 rounded-lg mr-4"></div>
              <div>
                <div className="h-8 bg-gray-700 rounded w-48 mb-2"></div>
                <div className="flex gap-2">
                  <div className="h-6 w-20 bg-gray-700 rounded-full"></div>
                  <div className="h-6 w-20 bg-gray-700 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6 mb-6"></div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="h-12 bg-gray-700 rounded"></div>
              <div className="h-12 bg-gray-700 rounded"></div>
              <div className="h-12 bg-gray-700 rounded"></div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="h-12 bg-gray-700 rounded flex-1"></div>
              <div className="h-12 bg-gray-700 rounded flex-1"></div>
            </div>
          </div>
        </div>

        {/* Индикатор загрузки */}
        <div className="flex flex-col items-center justify-center py-8">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-gray-400">Загрузка данных ODIN: Valhalla Rising...</p>
        </div>

        {/* Навигация скелетон */}
        <div className="bg-gray-800/95 py-4 my-6">
          <div className="flex justify-center gap-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-10 w-24 bg-gray-700 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Секции контента скелетон */}
        <div className="space-y-16">
          {[1, 2, 3].map(section => (
            <div key={section} className="space-y-8">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="h-8 bg-gray-700 rounded w-64 mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-96"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array(3)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i} className="bg-gray-800 rounded-xl h-64 animate-pulse"></div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
