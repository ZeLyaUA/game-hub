'use client';

import { addGame } from '@/app/actions/games';
import { useState } from 'react';

export function AddGameForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await addGame(formData);
      setSuccess(true);
      // Очищаем форму после успешного добавления
      const form = document.querySelector('form') as HTMLFormElement;
      form?.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
          Название игры
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
          placeholder="Например: World of Warcraft"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">
          URL постера
        </label>
        <input
          type="text"
          id="image"
          name="image"
          required
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
          placeholder="/images/game-poster.jpg"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
          Описание (необязательно)
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 text-white resize-none"
          placeholder="Краткое описание игры"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
          Статус
        </label>
        <select
          id="status"
          name="status"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
        >
          <option value="active">Активна</option>
          <option value="coming">Скоро выйдет</option>
        </select>
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
          Игра успешно добавлена!
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Добавление...' : 'Добавить игру'}
      </button>
    </form>
  );
}
