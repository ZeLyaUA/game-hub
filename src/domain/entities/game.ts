// src/domain/entities/game.ts
import { Entity, URL } from '../types/common';

export enum GameStatus {
  ACTIVE = 'active',
  COMING = 'coming',
  ARCHIVED = 'archived',
}

export interface GameEntity extends Entity {
  title: string;
  status: GameStatus;
  image: URL;
  description: string | null;
  color: string;
  accent: string;
}
