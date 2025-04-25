// src/infrastructure/di/getClientContainer.ts
import { ImageServiceClientImpl } from '../services/image.service.client';

export function getClientContainer() {
  const container = new Map<string, any>();

  const imageService = new ImageServiceClientImpl();

  container.set('ImageService', imageService);

  return {
    resolve: <T>(token: string): T => {
      const instance = container.get(token);
      if (!instance) {
        throw new Error(`No instance found for token: ${token}`);
      }
      return instance;
    },
  };
}
