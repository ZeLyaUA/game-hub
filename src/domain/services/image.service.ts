// src/domain/services/image.service.ts
import { URL } from '../types/common';

export interface ImageUploadOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

export interface IImageService {
  upload(file: File, options?: ImageUploadOptions): Promise<URL>;

  delete(url: URL): Promise<void>;

  optimize(buffer: Buffer, options?: ImageUploadOptions): Promise<Buffer>;

  cleanup(): Promise<{ deletedCount: number }>;
}

// src/domain/value-objects/color.ts
export class Color {
  constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new Error('Invalid color format');
    }
  }

  toString(): string {
    return this.value;
  }

  private isValid(color: string): boolean {
    // Validate CSS color format
    return (
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color) ||
      /^(rgb|hsl)a?\([^)]+\)$/.test(color) ||
      /^[a-z]+$/.test(color)
    );
  }
}
