'use server';

import { revalidatePath } from 'next/cache';

// В реальном приложении это должна быть база данных
// Для демонстрации используем in-memory storage
let games = [
  {
    id: 'odin',
    title: 'Odin: Valhalla Rising',
    status: 'active',
    image: '/odin-800x1200.jpg',
    description: 'Масштабная MMORPG с открытым миром и эпическими сражениями',
    color: 'from-blue-800/80 to-indigo-600/80',
    accent: 'blue-500',
  },
  {
    id: 'chrono',
    title: 'Chrono Odyssey',
    status: 'coming',
    image: '/odin-800x1200.jpg',
    description: 'Революционная RPG с манипуляцией временем',
    color: 'from-cyan-700/80 to-teal-600/80',
    accent: 'cyan-500',
  },
  {
    id: 'archeage',
    title: 'Archeage 2',
    status: 'coming',
    image: '/archeage2-800x1200.jpg',
    description: 'Продолжение легендарной песочницы с бесконечными возможностями',
    color: 'from-amber-800/80 to-orange-700/80',
    accent: 'amber-500',
  },
];

export async function getGames() {
  return games;
}

export async function addGame(formData: FormData) {
  const title = formData.get('title') as string;
  const image = formData.get('image') as string;
  const description = formData.get('description') as string;
  const status = formData.get('status') as string;

  if (!title || !image) {
    throw new Error('Title and image are required');
  }

  const id = title.toLowerCase().replace(/\s+/g, '-');

  const newGame = {
    id,
    title,
    image,
    description: description || '',
    status: status || 'coming',
    color: 'from-indigo-800/80 to-purple-600/80',
    accent: 'indigo-500',
  };

  games.push(newGame);

  // Обновляем страницы, которые используют эти данные
  revalidatePath('/');
  revalidatePath('/dashboard');

  return { success: true, game: newGame };
}

export async function deleteGame(id: string) {
  games = games.filter(game => game.id !== id);

  revalidatePath('/');
  revalidatePath('/dashboard');

  return { success: true };
}
