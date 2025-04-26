// src/app/api/cleanup/route.ts
import { getServerContainer } from '@/infrastructure/di/getServerContainer';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const container = getServerContainer();
    const imageService = container.resolve('ImageService');

    const result = await imageService.cleanup();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json({ error: 'Ошибка при очистке файлов' }, { status: 500 });
  }
}
