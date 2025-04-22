export type ClassSpecialization = {
  id: string;
  name: string;
  description: string;
  playstyle: string;
  difficulty: 'Легкий' | 'Средний' | 'Сложный';
  role: 'Танк' | 'Боец' | 'Маг' | 'Поддержка' | 'Стрелок';
  image: string;
};

export type ClassSkill = {
  id: string;
  name: string;
  description: string;
  cooldown: string;
  type: 'Атакующий' | 'Защитный' | 'Поддержка' | 'Контроль' | 'Движение';
  image: string;
};

export type ClassGear = {
  id: string;
  name: string;
  type: 'Оружие' | 'Броня' | 'Аксессуар';
  rarity: 'Обычный' | 'Редкий' | 'Эпический' | 'Легендарный';
  stats: string[];
  image: string;
};

export type ClassGuide = {
  id: string;
  title: string;
  author: string;
  date: string;
  type: 'PvE' | 'PvP' | 'Гибрид';
  level: 'Начальный' | 'Средний' | 'Продвинутый';
  image: string;
  url: string;
};

export type ClassInfo = {
  id: number;
  slug: string;
  name: string;
  icon: string;
  banner: string;
  heroBanner: string;
  description: string;
  lore: string;
  advantages: string[];
  disadvantages: string[];
  difficulty: 'Легкий' | 'Средний' | 'Сложный';
  roles: ('Танк' | 'Урон' | 'Поддержка' | 'Контроль')[];
  specializations: ClassSpecialization[];
  skills: ClassSkill[];
  recommendedGear: ClassGear[];
  guides: ClassGuide[];
};

export const classData: ClassInfo[] = [
  {
    id: 1,
    slug: 'warrior',
    name: 'ВОИН',
    icon: '/classes/warrior-icon.webp',
    banner: '/classes/warrior.png',
    heroBanner: '/classes/warrior-hero.jpg',
    description:
      'Класс, который защищает союзников и контролирует поле боя. Развивается в специализированную профессию, такую как оборонительно-ориентированный танк, универсальный танк с наступательными и оборонительными возможностями, и другие.',
    lore: 'Воины ODIN — элитные бойцы, прошедшие суровую подготовку в Железных горах. Они поклялись защищать земли Валгаллы своей жизнью, следуя кодексу чести древних берсерков. Их тела покрыты рунными татуировками, усиливающими их природную силу и выносливость. В бою они вызывают первобытную ярость, черпая силу из самых глубин своего существа.',
    advantages: ['Высокая выживаемость', 'Способность танковать урон', 'Сильный контроль поля боя'],
    disadvantages: [
      'Низкая мобильность',
      'Зависимость от экипировки',
      'Ограниченный урон по площади',
    ],
    difficulty: 'Средний',
    roles: ['Танк', 'Контроль', 'Урон'],
    specializations: [
      {
        id: 'berserker',
        name: 'Берсерк',
        description:
          'Воин, специализирующийся на нанесении мощного урона в ближнем бою и использовании ярости для усиления атак.',
        playstyle:
          'Агрессивный стиль игры с упором на атаку и контроль толпы через оглушение. Сильные атаки по одиночным целям и средний AoE урон.',
        difficulty: 'Средний',
        role: 'Боец',
        image: '/classes/specs/berserker.jpg',
      },
      {
        id: 'defender',
        name: 'Защитник',
        description:
          'Воин, специализирующийся на защите союзников и принятии урона на себя. Использует щит и защитные умения.',
        playstyle:
          'Защитный стиль с фокусом на выживание и отвлечение внимания врагов. Отличная выживаемость и способность защищать союзников.',
        difficulty: 'Средний',
        role: 'Танк',
        image: '/classes/specs/defender.jpg',
      },
    ],
    skills: [
      {
        id: 'whirlwind',
        name: 'Вихрь клинков',
        description: 'Воин кружится на месте, нанося урон всем противникам вокруг.',
        cooldown: '15 сек',
        type: 'Атакующий',
        image: '/classes/skills/whirlwind.png',
      },
      {
        id: 'shield-bash',
        name: 'Удар щитом',
        description: 'Сокрушительный удар щитом, оглушающий противника на 2 секунды.',
        cooldown: '12 сек',
        type: 'Контроль',
        image: '/classes/skills/shield-bash.png',
      },
      {
        id: 'battle-cry',
        name: 'Боевой клич',
        description:
          'Грозный крик, увеличивающий урон союзников и снижающий защиту противников в области действия.',
        cooldown: '45 сек',
        type: 'Поддержка',
        image: '/classes/skills/battle-cry.png',
      },
      {
        id: 'charge',
        name: 'Рывок',
        description: 'Стремительный рывок к цели, наносящий урон и оглушающий её при столкновении.',
        cooldown: '20 сек',
        type: 'Движение',
        image: '/classes/skills/charge.png',
      },
      {
        id: 'shield-wall',
        name: 'Стена щитов',
        description: 'Воин поднимает щит, значительно уменьшая получаемый урон на 5 секунд.',
        cooldown: '60 сек',
        type: 'Защитный',
        image: '/classes/skills/shield-wall.png',
      },
    ],
    recommendedGear: [
      {
        id: 'mjolnir',
        name: 'Мьёльнир',
        type: 'Оружие',
        rarity: 'Легендарный',
        stats: ['Сила +50', 'Крит. удар +15%', 'При ударе есть 10% шанс вызвать молнию'],
        image: '/classes/gear/mjolnir.png',
      },
      {
        id: 'valhalla-plate',
        name: 'Доспех Валгаллы',
        type: 'Броня',
        rarity: 'Эпический',
        stats: ['Защита +100', 'Здоровье +500', 'Сопротивление стихиям +20%'],
        image: '/classes/gear/valhalla-plate.png',
      },
      {
        id: 'tyr-bracers',
        name: 'Наручи Тюра',
        type: 'Аксессуар',
        rarity: 'Редкий',
        stats: ['Сила +25', 'Скорость атаки +10%', 'Сопротивление оглушению +15%'],
        image: '/classes/gear/tyr-bracers.png',
      },
    ],
    guides: [
      {
        id: 'warrior-leveling',
        title: 'Гайд по прокачке Воина от 1 до 50 уровня',
        author: 'IronViking',
        date: '15 апреля 2025',
        type: 'PvE',
        level: 'Начальный',
        image: '/classes/guides/warrior-leveling.jpg',
        url: '/guides/warrior-leveling',
      },
      {
        id: 'berserker-pvp',
        title: 'Берсерк в PvP: максимальный урон и выживаемость',
        author: 'AxeMaster',
        date: '10 апреля 2025',
        type: 'PvP',
        level: 'Продвинутый',
        image: '/classes/guides/berserker-pvp.jpg',
        url: '/guides/berserker-pvp',
      },
      {
        id: 'defender-raid',
        title: 'Защитник в рейдах: руководство для танков',
        author: 'ShieldWall',
        date: '5 апреля 2025',
        type: 'PvE',
        level: 'Средний',
        image: '/classes/guides/defender-raid.jpg',
        url: '/guides/defender-raid',
      },
    ],
  },
  {
    id: 2,
    slug: 'sorceress',
    name: 'ЧАРОДЕЙКА',
    icon: '/classes/sorceress-icon.webp',
    banner: '/classes/sorceress.png',
    heroBanner: '/classes/sorceress-hero.jpg',
    description:
      'Класс, который наносит огромный урон нескольким противникам, используя разнообразные заклинания. Развивается в специализированную профессию, сосредоточенную на одном из различных типов заклинаний, таких как взрывной урон, контроль толпы, призыв существ и многое другое.',
    lore: 'Чародейки — последователи древнего ордена Эмблазон, хранящего секреты стихийной магии со времён основания Валгаллы. Они черпают силу из самой природы, преобразуя стихийные энергии в разрушительные заклинания. Их тела покрыты мистическими татуировками, усиливающими связь с магическими потоками мира. Даже боги с уважением относятся к мощи, которой обладают истинные мастера этого ордена.',
    advantages: ['Высокий урон по области', 'Контроль толпы', 'Заклинания на все случаи'],
    disadvantages: [
      'Низкая защита',
      'Долгое время произнесения заклинаний',
      'Уязвимость в ближнем бою',
    ],
    difficulty: 'Сложный',
    roles: ['Урон', 'Контроль'],
    specializations: [
      {
        id: 'elementalist',
        name: 'Элементалист',
        description:
          'Магический класс, специализирующийся на использовании стихийной магии огня, воды, воздуха и земли.',
        playstyle:
          'Комбинирование стихийных заклинаний для создания мощных эффектов. Высокий урон по области и контроль поля боя.',
        difficulty: 'Сложный',
        role: 'Маг',
        image: '/classes/specs/elementalist.jpg',
      },
      {
        id: 'warlock',
        name: 'Чернокнижник',
        description:
          'Магический класс, специализирующийся на темной магии, проклятиях и призыве демонических существ.',
        playstyle:
          'Нанесение урона со временем через проклятия и использование призванных существ. Отличный контроль и средний урон.',
        difficulty: 'Средний',
        role: 'Маг',
        image: '/classes/specs/warlock.jpg',
      },
    ],
    // Дополнить остальные данные по аналогии с классом Воин
    skills: [],
    recommendedGear: [],
    guides: [],
  },
  {
    id: 3,
    slug: 'rogue',
    name: 'РАЗБОЙНИК',
    icon: '/classes/rogue-icon.webp',
    banner: '/classes/rogue.png',
    heroBanner: '/classes/rogue-hero.jpg',
    description:
      'Класс, который наносит огромный урон мощными физическими атаками. Развивается в специализированную профессию, сосредоточенную на дальних атаках или ближнем бою.',
    lore: 'Разбойники — выходцы из теневого братства Ночных Клинков, таинственной организации, действующей в тенях мира ODIN. Мастера скрытности и смертоносной точности, они совершенствуют своё искусство убийства годами. Их передвижения легки и незаметны, а удары — молниеносны и смертельны. Говорят, что истинного разбойника можно увидеть только один раз в жизни — в момент собственной смерти.',
    advantages: ['Высокая мобильность', 'Убийственный урон по одиночной цели', 'Скрытность'],
    disadvantages: [
      'Низкая выживаемость',
      'Сложность в групповых сражениях',
      'Высокая зависимость от экипировки',
    ],
    difficulty: 'Средний',
    roles: ['Урон'],
    specializations: [],
    skills: [],
    recommendedGear: [],
    guides: [],
  },
  {
    id: 4,
    slug: 'priest',
    name: 'ЖРЕЦ',
    icon: '/classes/priest-icon.webp',
    banner: '/classes/priest.png',
    heroBanner: '/classes/priest-hero.jpg',
    description:
      'Класс, который лечит союзников и помогает выживать. Развивается в специализированную профессию, такую как специалист, сосредоточенный на исцелении, универсальный защитный танк, и другие.',
    lore: 'Жрецы — избранники богов, наделенные силой исцеления и света. Они относятся к древнему ордену Аскры, поклоняющемуся светлым аспектам пантеона ODIN. Годами они изучают священные писания и совершенствуют свою связь с божественными силами. Каждый жрец носит священные символы своего покровителя и произносит молитвы перед тем, как использовать силу исцеления или возмездия.',
    advantages: ['Мощное исцеление', 'Защитные барьеры', 'Универсальность'],
    disadvantages: ['Ограниченный урон', 'Зависимость от группы', 'Низкая мобильность'],
    difficulty: 'Легкий',
    roles: ['Поддержка', 'Контроль'],
    specializations: [],
    skills: [],
    recommendedGear: [],
    guides: [],
  },
];
