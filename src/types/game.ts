// src/types/game.ts
import { Game as PrismaGame } from '@/generated/prisma';

export type GameStatus = 'active' | 'coming';

export interface GameWithIcon extends PrismaGame {
  icon: React.ReactNode;
}

export interface GameCardProps {
  game: GameWithIcon;
  index: number;
  activeGame: string | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export interface AddGameFormData {
  title: string;
  image: string;
  description?: string;
  status: GameStatus;
}

export interface EditGameFormData extends AddGameFormData {
  id: string;
  color: string;
  accent: string;
}

export interface GameListFilters {
  status: 'all' | GameStatus;
  sortBy: 'date' | 'title';
  order: 'asc' | 'desc';
}

export interface DashboardUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
  lastActive: string;
  avatar: string;
}

export interface DashboardNotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface DashboardActivity {
  id: string;
  type: 'create' | 'update' | 'delete' | 'user' | 'view';
  title: string;
  description: string;
  time: string;
  user: string;
}

export interface UploadResponse {
  url: string;
  success?: boolean;
  error?: string;
}

export interface CleanupResponse {
  success: boolean;
  deletedCount?: number;
  error?: string;
}

export interface ApiError {
  error: string;
  code?: string;
  status?: number;
}
