// src/lib/utils/cleanupImages.ts
import { prisma } from '@/lib/prisma';
import { readdir, unlink } from 'fs/promises';
import path from 'path';

export async function cleanupUnusedImages() {
  try {
    // Получаем все пути к изображениям из базы данных
    const games = await prisma.game.findMany({
      select: { image: true },
    });

    const usedImages = new Set(
      games
        .map(game => game.image)
        .filter(image => image && image.startsWith('/uploads/'))
        .map(image => path.basename(image))
    );

    // Получаем все файлы из директории uploads
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    let files: string[] = [];

    try {
      files = await readdir(uploadsDir);
    } catch (error) {
      // Директория не существует
      console.log(error);
      return { success: true, deletedCount: 0 };
    }

    // Удаляем неиспользуемые файлы
    let deletedCount = 0;
    for (const file of files) {
      if (!usedImages.has(file) && file !== '.gitignore') {
        try {
          await unlink(path.join(uploadsDir, file));
          deletedCount++;
        } catch (error) {
          console.error(`Failed to delete file ${file}:`, error);
        }
      }
    }

    return { success: true, deletedCount };
  } catch (error) {
    console.error('Cleanup failed:', error);
    return { success: false, error };
  }
}
