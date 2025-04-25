'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getGames() {
  try {
    const games = await prisma.game.findMany({
      orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
    });
    return games;
  } catch (error) {
    console.error('Failed to fetch games:', error);
    return [];
  }
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

  try {
    const newGame = await prisma.game.create({
      data: {
        id,
        title,
        image,
        description: description || '',
        status: status || 'coming',
        color: 'from-indigo-800/80 to-purple-600/80',
        accent: 'indigo-500',
      },
    });

    revalidatePath('/');
    revalidatePath('/dashboard');

    return { success: true, game: newGame };
  } catch (error) {
    console.error('Failed to add game:', error);
    throw new Error('Failed to add game');
  }
}

export async function deleteGame(id: string) {
  try {
    await prisma.game.delete({
      where: { id },
    });

    revalidatePath('/');
    revalidatePath('/dashboard');

    return { success: true };
  } catch (error) {
    console.error('Failed to delete game:', error);
    throw new Error('Failed to delete game');
  }
}
