// src/app/api/upload/delete/route.ts
import { unlink } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { filePath } = await request.json();

    if (!filePath) {
      return NextResponse.json({ error: 'Путь к файлу не указан' }, { status: 400 });
    }

    // Убеждаемся, что файл находится в директории uploads
    if (!filePath.startsWith('/uploads/')) {
      return NextResponse.json({ error: 'Недопустимый путь к файлу' }, { status: 400 });
    }

    const fullPath = path.join(process.cwd(), 'public', filePath);

    try {
      await unlink(fullPath);
      return NextResponse.json({ success: true });
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        // Файл не существует, но это не ошибка
        return NextResponse.json({ success: true });
      }
      throw error;
    }
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Ошибка при удалении файла' }, { status: 500 });
  }
}
