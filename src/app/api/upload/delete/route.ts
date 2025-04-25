// src/app/api/upload/delete/route.ts
import { ApiError } from '@/types/game';
import fs from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

interface DeleteRequest {
  filePath: string;
}

export async function POST(request: NextRequest) {
  try {
    const { filePath }: DeleteRequest = await request.json();

    if (!filePath) {
      const error: ApiError = { error: 'Путь к файлу не указан', status: 400 };
      return NextResponse.json(error, { status: 400 });
    }

    // Убеждаемся, что файл находится в директории uploads
    if (!filePath.startsWith('/uploads/')) {
      const error: ApiError = { error: 'Недопустимый путь к файлу', status: 400 };
      return NextResponse.json(error, { status: 400 });
    }

    const fullPath = path.join(process.cwd(), 'public', filePath);

    try {
      await fs.unlink(fullPath);
      return NextResponse.json({ success: true });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        // Файл не существует, но это не ошибка
        return NextResponse.json({ success: true });
      }
      throw error;
    }
  } catch (error) {
    console.error('Delete error:', error);
    const apiError: ApiError = { error: 'Ошибка при удалении файла', status: 500 };
    return NextResponse.json(apiError, { status: 500 });
  }
}
