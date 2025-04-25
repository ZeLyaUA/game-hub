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

export async function getGameById(id: string) {
  try {
    const game = await prisma.game.findUnique({
      where: { id },
    });
    return game;
  } catch (error) {
    console.error('Failed to fetch game:', error);
    return null;
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

export async function updateGame(formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const image = formData.get('image') as string;
  const description = formData.get('description') as string;
  const status = formData.get('status') as string;
  const color = formData.get('color') as string;
  const accent = formData.get('accent') as string;

  if (!id || !title || !image) {
    throw new Error('ID, title and image are required');
  }

  try {
    const updatedGame = await prisma.game.update({
      where: { id },
      data: {
        title,
        image,
        description,
        status,
        color,
        accent,
      },
    });

    revalidatePath('/');
    revalidatePath('/dashboard');
    revalidatePath(`/game/${id}`);
    revalidatePath(`/dashboard/games/${id}/edit`);

    return { success: true, game: updatedGame };
  } catch (error) {
    console.error('Failed to update game:', error);
    throw new Error('Failed to update game');
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
