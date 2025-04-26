// src/app/api/games/route.ts
import { GameStatus } from '@/domain/entities/game';
import { getServerContainer } from '@/infrastructure/di/getServerContainer';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const container = getServerContainer();
    const gameService = container.resolve('GameService');

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') as GameStatus | null;
    const search = searchParams.get('search') || undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sortBy = (searchParams.get('sortBy') as 'title' | 'createdAt') || 'createdAt';
    const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc';

    const result = await gameService.getGames(
      { status: status || undefined, search },
      { page, limit },
      { field: sortBy, order: sortOrder }
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching games:', error);
    return NextResponse.json({ error: 'Failed to fetch games' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const container = getServerContainer();
    const gameService = container.resolve('GameService');

    const data = await request.json();
    const game = await gameService.createGame(data);
    return NextResponse.json(game);
  } catch (error) {
    console.error('Error creating game:', error);
    return NextResponse.json({ error: 'Failed to create game' }, { status: 500 });
  }
}
