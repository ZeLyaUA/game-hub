// src/app/api/cleanup/route.ts
import { IImageService } from '@/domain/services/image.service';
import { getServerContainer } from '@/infrastructure/di/getServerContainer';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const container = getServerContainer();
    const imageService = container.resolve<IImageService>('ImageService');

    const result = await imageService.cleanup();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json({ error: 'Ошибка при очистке файлов' }, { status: 500 });
  }
}
