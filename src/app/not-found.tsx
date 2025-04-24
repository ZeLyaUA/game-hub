import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-md">
        <h1 className="text-6xl font-bold text-indigo-400 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-4">Страница не найдена</h2>
        <p className="text-gray-400 mb-8">
          Похоже, что страница, которую вы ищете, не существует или была перемещена.
        </p>
        <Link
          href="/"
          className="inline-block py-3 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors duration-300"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
