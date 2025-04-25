// src/infrastructure/di/container.ts
import { IGameRepository } from '@/domain/repositories/game.repository';
import { IGameService } from '@/domain/services/game.service';
import { IImageService } from '@/domain/services/image.service';
import { PrismaClient } from '@/generated/prisma';
import { GameRepositoryImpl } from '../repositories/game.repository.impl';
import { GameServiceImpl } from '../services/game.service.impl';

class Container {
  private instances = new Map<string, any>();

  register<T>(token: string, instance: T): void {
    this.instances.set(token, instance);
  }

  resolve<T>(token: string): T {
    const instance = this.instances.get(token);

    if (!instance) {
      throw new Error(`No instance found for token: ${token}`);
    }

    return instance;
  }
}

// Создаем глобальный контейнер
const container = new Container();

// Базовые зависимости
const prisma = new PrismaClient();
const gameRepository = new GameRepositoryImpl(prisma);
const gameService = new GameServiceImpl(gameRepository);

// Регистрируем зависимости
container.register<PrismaClient>('PrismaClient', prisma);
container.register<IGameRepository>('GameRepository', gameRepository);
container.register<IGameService>('GameService', gameService);

// Динамически выбираем реализацию ImageService в зависимости от среды
if (typeof window === 'undefined') {
  // На сервере используем серверную реализацию
  import('../services/image.service.server').then(({ ImageServiceServerImpl }) => {
    const imageService = new ImageServiceServerImpl();
    container.register<IImageService>('ImageService', imageService);
  });
} else {
  // На клиенте используем клиентскую реализацию
  import('../services/image.service.client').then(({ ImageServiceClientImpl }) => {
    const imageService = new ImageServiceClientImpl();
    container.register<IImageService>('ImageService', imageService);
  });
}

export { container };
