// src/app/api/cleanup/route.ts
import { cleanupUnusedImages } from '@/lib/utils/cleanupImages';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const result = await cleanupUnusedImages();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json({ error: 'Ошибка при очистке файлов' }, { status: 500 });
  }
}
