// src/infrastructure/di/types.ts
import { IGameRepository } from '@/domain/repositories/game.repository';
import { IGameService } from '@/domain/services/game.service';
import { IImageService } from '@/domain/services/image.service';
import { PrismaClient } from '@/generated/prisma';

export type DependencyToken = 'PrismaClient' | 'GameRepository' | 'GameService' | 'ImageService';

export interface DependencyMap {
  PrismaClient: PrismaClient;
  GameRepository: IGameRepository;
  GameService: IGameService;
  ImageService: IImageService;
}

export interface IContainer {
  resolve<K extends DependencyToken>(token: K): DependencyMap[K];
}

export class Container implements IContainer {
  private instances = new Map<DependencyToken, unknown>();

  register<K extends DependencyToken>(token: K, instance: DependencyMap[K]): void {
    this.instances.set(token, instance);
  }

  resolve<K extends DependencyToken>(token: K): DependencyMap[K] {
    const instance = this.instances.get(token);

    if (!instance) {
      throw new Error(`No instance found for token: ${token}`);
    }

    return instance as DependencyMap[K];
  }
}
