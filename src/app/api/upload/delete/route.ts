// src/app/api/upload/delete/route.ts
import { IImageService } from '@/domain/services/image.service';
import { getServerContainer } from '@/infrastructure/di/getServerContainer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { filePath } = await request.json();

    if (!filePath) {
      return NextResponse.json({ error: 'Путь к файлу не указан' }, { status: 400 });
    }

    const container = getServerContainer();
    const imageService = container.resolve<IImageService>('ImageService');

    await imageService.delete(filePath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Ошибка при удалении файла' }, { status: 500 });
  }
}
