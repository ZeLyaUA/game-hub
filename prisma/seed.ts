import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const games = [
    {
      id: 'odin',
      title: 'Odin: Valhalla Rising',
      status: 'active',
      image: '/odin-800x1200.jpg',
      description: 'Масштабная MMORPG с открытым миром и эпическими сражениями',
      color: 'from-blue-800/80 to-indigo-600/80',
      accent: 'blue-500',
    },
    {
      id: 'chrono',
      title: 'Chrono Odyssey',
      status: 'coming',
      image: '/odin-800x1200.jpg',
      description: 'Революционная RPG с манипуляцией временем',
      color: 'from-cyan-700/80 to-teal-600/80',
      accent: 'cyan-500',
    },
    {
      id: 'archeage',
      title: 'Archeage 2',
      status: 'coming',
      image: '/archeage2-800x1200.jpg',
      description: 'Продолжение легендарной песочницы с бесконечными возможностями',
      color: 'from-amber-800/80 to-orange-700/80',
      accent: 'amber-500',
    },
  ];

  for (const game of games) {
    await prisma.game.upsert({
      where: { id: game.id },
      update: game,
      create: game,
    });
  }

  console.log('Seed data inserted successfully');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
