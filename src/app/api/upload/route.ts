// src/app/api/upload/route.ts
import { unlink } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const oldImagePath = formData.get('oldImagePath') as string;

    if (!file) {
      return NextResponse.json({ error: 'Файл не найден' }, { status: 400 });
    }

    // Проверяем тип файла
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Разрешены только изображения' }, { status: 400 });
    }

    // Создаем уникальное имя файла
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Генерируем уникальное имя файла
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}.webp`; // Сохраняем как WebP

    // Путь для сохранения файла
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filepath = path.join(uploadDir, filename);

    // Создаем директорию, если её нет
    try {
      const fs = require('fs');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
    } catch (err) {
      console.error('Error creating directory:', err);
    }

    // Оптимизируем изображение
    await sharp(buffer)
      .resize(800, 1200, {
        // Размер для постера
        fit: 'cover',
        position: 'center',
      })
      .webp({ quality: 80 }) // Конвертируем в WebP с качеством 80%
      .toFile(filepath);

    // Удаляем старый файл, если он существует
    if (oldImagePath && oldImagePath.startsWith('/uploads/')) {
      const oldFilePath = path.join(process.cwd(), 'public', oldImagePath);
      try {
        await unlink(oldFilePath);
      } catch (error: any) {
        if (error.code !== 'ENOENT') {
          // Игнорируем ошибку, если файл не существует
          console.error('Error deleting old file:', error);
        }
      }
    }

    // Возвращаем URL загруженного файла
    const imageUrl = `/uploads/${filename}`;

    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Ошибка при загрузке файла' }, { status: 500 });
  }
}
