// src/app/api/games/[id]/route.ts
import { getServerContainer } from '@/infrastructure/di/getServerContainer';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const container = getServerContainer();
    const gameService = container.resolve('GameService');

    const game = await gameService.getGame(resolvedParams.id);
    return NextResponse.json(game);
  } catch (error) {
    if (error instanceof Error && error.message === 'Game not found') {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to fetch game' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const container = getServerContainer();
    const gameService = container.resolve('GameService');

    const data = await request.json();
    const game = await gameService.updateGame(resolvedParams.id, data);
    return NextResponse.json(game);
  } catch (error) {
    if (error instanceof Error && error.message === 'Game not found') {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to update game' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const container = getServerContainer();
    const gameService = container.resolve('GameService');

    await gameService.deleteGame(resolvedParams.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === 'Game not found') {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to delete game' }, { status: 500 });
  }
}
