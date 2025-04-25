// src/app/api/upload/route.ts
import { IImageService } from '@/domain/services/image.service';
import { getServerContainer } from '@/infrastructure/di/getServerContainer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const optionsString = formData.get('options') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'Файл не найден' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Разрешены только изображения' }, { status: 400 });
    }

    const container = getServerContainer();
    const imageService = container.resolve<IImageService>('ImageService');

    const options = optionsString ? JSON.parse(optionsString) : undefined;
    const url = await imageService.upload(file, options);

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Ошибка при загрузке файла' }, { status: 500 });
  }
}
