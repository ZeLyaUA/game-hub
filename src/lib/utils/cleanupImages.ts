// src/lib/utils/cleanupImages.ts
import { prisma } from '@/lib/prisma';
import { CleanupResponse } from '@/types/game';
import fs from 'fs/promises';
import path from 'path';

export async function cleanupUnusedImages(): Promise<CleanupResponse> {
  try {
    // Получаем все пути к изображениям из базы данных
    const games = await prisma.game.findMany({
      select: { image: true },
    });

    const usedImages = new Set(
      games
        .map(game => game.image)
        .filter((image): image is string => Boolean(image) && image.startsWith('/uploads/'))
        .map(image => path.basename(image))
    );

    // Получаем все файлы из директории uploads
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    let files: string[] = [];

    try {
      files = await fs.readdir(uploadsDir);
    } catch (error) {
      // Директория не существует
      console.log('Uploads directory does not exist:', error);
      return { success: true, deletedCount: 0 };
    }

    // Удаляем неиспользуемые файлы
    let deletedCount = 0;

    for (const file of files) {
      // Пропускаем .gitignore и другие системные файлы
      if (file.startsWith('.') || !file.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
        continue;
      }

      if (!usedImages.has(file)) {
        try {
          await fs.unlink(path.join(uploadsDir, file));
          deletedCount++;
        } catch (error) {
          console.error(`Failed to delete file ${file}:`, error);
        }
      }
    }

    return { success: true, deletedCount };
  } catch (error) {
    console.error('Cleanup failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
