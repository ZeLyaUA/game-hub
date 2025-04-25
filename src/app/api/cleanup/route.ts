// src/app/api/cleanup/route.ts
import { cleanupUnusedImages } from '@/lib/utils/cleanupImages';
import { ApiError, CleanupResponse } from '@/types/game';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const result = await cleanupUnusedImages();

    if (!result.success && result.error) {
      const error: ApiError = {
        error: result.error.message || 'Ошибка при очистке файлов',
        status: 500,
      };
      return NextResponse.json(error, { status: 500 });
    }

    const response: CleanupResponse = {
      success: result.success,
      deletedCount: result.deletedCount,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Cleanup error:', error);
    const apiError: ApiError = { error: 'Ошибка при очистке файлов', status: 500 };
    return NextResponse.json(apiError, { status: 500 });
  }
}
