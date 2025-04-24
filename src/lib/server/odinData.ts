import { odinGameData } from '@/data/games/odin';
import odinClasses from '@/data/games/odin/classes';
import odinDatabase from '@/data/games/odin/database';

export async function getOdinData() {
  // Имитация задержки для получения данных с сервера
  await new Promise(resolve => setTimeout(resolve, 100));

  return {
    gameData: odinGameData,
    classes: odinClasses,
    database: odinDatabase,
  };
}

export async function getOdinClassBySlug(slug: string) {
  // Имитация задержки для получения данных с сервера
  await new Promise(resolve => setTimeout(resolve, 100));

  return odinClasses.find(cls => cls.slug === slug);
}

export async function getOdinRegions() {
  // Имитация задержки для получения данных с сервера
  await new Promise(resolve => setTimeout(resolve, 100));

  return odinDatabase.regions;
}

export async function getOdinBosses() {
  // Имитация задержки для получения данных с сервера
  await new Promise(resolve => setTimeout(resolve, 100));

  return odinDatabase.bosses;
}
