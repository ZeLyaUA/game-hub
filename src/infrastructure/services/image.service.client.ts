// src/infrastructure/services/image.service.client.ts
import { IImageService, ImageUploadOptions } from '@/domain/services/image.service';
import { URL } from '@/domain/types/common';

export class ImageServiceClientImpl implements IImageService {
  async upload(file: File, options?: ImageUploadOptions): Promise<URL> {
    const formData = new FormData();
    formData.append('file', file);

    if (options) {
      formData.append('options', JSON.stringify(options));
    }

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data.url;
  }

  async delete(url: URL): Promise<void> {
    const response = await fetch('/api/upload/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filePath: url }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete image');
    }
  }

  async optimize(buffer: Buffer, options?: ImageUploadOptions): Promise<Buffer> {
    throw new Error('Optimize is not available on client side');
  }

  async cleanup(): Promise<{ deletedCount: number }> {
    const response = await fetch('/api/cleanup', {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to cleanup images');
    }

    const data = await response.json();
    return { deletedCount: data.deletedCount };
  }
}
