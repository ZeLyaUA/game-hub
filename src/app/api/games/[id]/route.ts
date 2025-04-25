// src/app/api/games/[id]/route.ts
import { IGameService } from '@/domain/services/game.service';
import { container } from '@/infrastructure/di/container';
import { NextRequest, NextResponse } from 'next/server';

const gameService = container.resolve<IGameService>('GameService');

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const game = await gameService.getGame(params.id);
    return NextResponse.json(game);
  } catch (error) {
    if (error instanceof Error && error.message === 'Game not found') {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to fetch game' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const game = await gameService.updateGame(params.id, data);
    return NextResponse.json(game);
  } catch (error) {
    if (error instanceof Error && error.message === 'Game not found') {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to update game' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await gameService.deleteGame(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === 'Game not found') {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to delete game' }, { status: 500 });
  }
}
