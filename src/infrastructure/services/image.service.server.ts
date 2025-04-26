// src/infrastructure/services/image.service.server.ts
import { IImageService, ImageUploadOptions } from '@/domain/services/image.service';
import { URL } from '@/domain/types/common';
import { PrismaClient } from '@/generated/prisma';
import fs from 'fs';
import { mkdir, readdir, unlink } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export class ImageServiceServerImpl implements IImageService {
  private readonly uploadDir = path.join(process.cwd(), 'public', 'uploads');
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
    // Создаем директорию uploads при инициализации сервиса, если её нет
    this.ensureUploadDirExists();
  }

  private async ensureUploadDirExists() {
    try {
      await mkdir(this.uploadDir, { recursive: true });
    } catch (error) {
      console.error('Failed to create upload directory:', error);
    }
  }

  async upload(file: File, options?: ImageUploadOptions): Promise<URL> {
    try {
      await this.ensureUploadDirExists();

      const buffer = Buffer.from(await file.arrayBuffer());
      const optimizedBuffer = await this.optimize(buffer, options);

      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
      const filepath = path.join(this.uploadDir, filename);

      await sharp(optimizedBuffer).toFile(filepath);

      return `/uploads/${filename}`;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }

  async delete(url: URL): Promise<void> {
    if (!url.startsWith('/uploads/')) {
      throw new Error('Invalid file path');
    }

    const filepath = path.join(process.cwd(), 'public', url);

    try {
      // Проверяем существование файла перед удалением
      if (fs.existsSync(filepath)) {
        await unlink(filepath);
        console.log(`Deleted file: ${url}`);
      } else {
        console.log(`File not found: ${url}`);
      }
    } catch (error: unknown) {
      const err = error as NodeJS.ErrnoException;
      if (err.code !== 'ENOENT') {
        console.error(`Error deleting file ${url}:`, error);
        throw error;
      }
    }
  }

  async optimize(buffer: Buffer, options?: ImageUploadOptions): Promise<Buffer> {
    const defaultOptions = {
      width: 800,
      height: 1200,
      quality: 80,
      format: 'webp' as const,
    };

    const finalOptions = { ...defaultOptions, ...options };

    return sharp(buffer)
      .resize(finalOptions.width, finalOptions.height, {
        fit: 'cover',
        position: 'center',
      })
      .webp({ quality: finalOptions.quality })
      .toBuffer();
  }

  async cleanup(): Promise<{ deletedCount: number }> {
    try {
      const games = await this.prisma.game.findMany({
        select: { image: true },
      });

      const usedImages = new Set(
        games
          .map(game => game.image)
          .filter(image => image && image.startsWith('/uploads/'))
          .map(image => path.basename(image))
      );

      // Проверяем существование директории
      try {
        await fs.promises.access(this.uploadDir);
      } catch {
        await this.ensureUploadDirExists();
        return { deletedCount: 0 };
      }

      let files: string[] = [];

      try {
        files = await readdir(this.uploadDir);
      } catch (error) {
        console.error('Failed to read upload directory:', error);
        return { deletedCount: 0 };
      }

      let deletedCount = 0;

      for (const file of files) {
        // Пропускаем .gitignore и другие системные файлы
        if (file.startsWith('.') || !file.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
          continue;
        }

        if (!usedImages.has(file)) {
          try {
            const filePath = path.join(this.uploadDir, file);
            await unlink(filePath);
            deletedCount++;
            console.log(`Deleted unused file: ${file}`);
          } catch (error) {
            console.error(`Failed to delete file ${file}:`, error);
          }
        }
      }

      return { deletedCount };
    } catch (error) {
      console.error('Cleanup error:', error);
      throw error;
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
