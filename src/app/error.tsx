'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Логирование ошибки на сервер
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-md">
        <h1 className="text-6xl font-bold text-red-500 mb-4">Ошибка</h1>
        <h2 className="text-3xl font-bold text-white mb-4">Что-то пошло не так</h2>
        <p className="text-gray-400 mb-8">
          Произошла непредвиденная ошибка. Наша команда уже работает над её устранением.
        </p>
        <button
          onClick={() => reset()}
          className="py-3 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors duration-300"
        >
          Попробовать снова
        </button>
      </div>
    </div>
  );
}
