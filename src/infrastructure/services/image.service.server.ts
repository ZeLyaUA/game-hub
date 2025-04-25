// src/infrastructure/services/image.service.server.ts
import { IImageService, ImageUploadOptions } from '@/domain/services/image.service';
import { URL } from '@/domain/types/common';
import { prisma } from '@/lib/prisma';
import { readdir, unlink } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export class ImageServiceServerImpl implements IImageService {
  private readonly uploadDir = path.join(process.cwd(), 'public', 'uploads');

  async upload(file: File, options?: ImageUploadOptions): Promise<URL> {
    const buffer = Buffer.from(await file.arrayBuffer());
    const optimizedBuffer = await this.optimize(buffer, options);

    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
    const filepath = path.join(this.uploadDir, filename);

    await sharp(optimizedBuffer).toFile(filepath);

    return `/uploads/${filename}`;
  }

  async delete(url: URL): Promise<void> {
    if (!url.startsWith('/uploads/')) {
      throw new Error('Invalid file path');
    }

    const filepath = path.join(process.cwd(), 'public', url);

    try {
      await unlink(filepath);
    } catch (error: any) {
      if (error.code !== 'ENOENT') {
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
    const games = await prisma.game.findMany({
      select: { image: true },
    });

    const usedImages = new Set(
      games
        .map(game => game.image)
        .filter(image => image && image.startsWith('/uploads/'))
        .map(image => path.basename(image))
    );

    let files: string[] = [];

    try {
      files = await readdir(this.uploadDir);
    } catch (error) {
      console.error('Failed to read upload directory:', error);
      return { deletedCount: 0 };
    }

    let deletedCount = 0;

    for (const file of files) {
      if (!usedImages.has(file) && file !== '.gitignore') {
        try {
          await unlink(path.join(this.uploadDir, file));
          deletedCount++;
        } catch (error) {
          console.error(`Failed to delete file ${file}:`, error);
        }
      }
    }

    return { deletedCount };
  }
}
