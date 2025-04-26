// src/infrastructure/di/getClientContainer.ts
import { ImageServiceClientImpl } from '../services/image.service.client';
import { Container, IContainer } from './types';

export function getClientContainer(): IContainer {
  const container = new Container();

  const imageService = new ImageServiceClientImpl();

  container.register('ImageService', imageService);

  return container;
}
