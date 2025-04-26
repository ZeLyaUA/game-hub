// src/app/api/games/stats/route.ts
import { getServerContainer } from '@/infrastructure/di/getServerContainer';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const container = getServerContainer();
    const gameService = container.resolve('GameService');

    const stats = await gameService.getStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching game stats:', error);
    return NextResponse.json({ error: 'Failed to fetch game stats' }, { status: 500 });
  }
}
