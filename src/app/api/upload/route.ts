// src/app/api/upload/route.ts
import { ImageUploadOptions } from '@/domain/services/image.service';
import { getServerContainer } from '@/infrastructure/di/getServerContainer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const optionsString = formData.get('options') as string | null;
    const oldImagePath = formData.get('oldImagePath') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'Файл не найден' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Разрешены только изображения' }, { status: 400 });
    }

    const container = getServerContainer();
    const imageService = container.resolve('ImageService');

    // Если передан путь к старому изображению, удаляем его
    if (oldImagePath && oldImagePath.startsWith('/uploads/')) {
      try {
        await imageService.delete(oldImagePath);
      } catch (error) {
        console.error('Failed to delete old image:', error);
        // Продолжаем загрузку нового изображения даже если старое не удалось удалить
      }
    }

    const options: ImageUploadOptions | undefined = optionsString
      ? JSON.parse(optionsString)
      : undefined;

    const url = await imageService.upload(file, options);

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Ошибка при загрузке файла' }, { status: 500 });
  }
}
