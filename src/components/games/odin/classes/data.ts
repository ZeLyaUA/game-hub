// Упрощенный файл data.ts с минимальным набором навыков

export type ClassArchetype = {
  id: string;
  name: string;
  icon: string;
  description: string;
  role: 'Танк' | 'Урон' | 'Поддержка' | 'Контроль';
  skills: ClassSkill[];
};

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
  cooldown?: string;
  type: 'Атакующий' | 'Защитный' | 'Поддержка' | 'Контроль' | 'Движение' | 'Усиление' | 'Пассивный';
  image: string;
  isPassive?: boolean;
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
  archetypes: ClassArchetype[];
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
    archetypes: [
      {
        id: 'berserker',
        name: 'Берсерк',
        icon: '/classes/archetypes/berserker-icon.png',
        description:
          'Элитный воин, специализирующийся на атаке и высоком уроне. Использует ярость для усиления своих атак.',
        role: 'Урон',
        skills: [
          {
            id: 'berserker-rage',
            name: 'Неистовство',
            description:
              'Повышает урон на 25% и скорость атаки на 15% на 10 секунд, но снижает защиту на 10%',
            cooldown: '30 сек',
            type: 'Усиление',
            image: '/classes/skills/berserker-rage.png',
            isPassive: false,
          },
          {
            id: 'battle-fury',
            name: 'Боевое неистовство',
            description:
              'Пассивный навык: когда здоровье падает ниже 30%, урон увеличивается на 20% на 8 секунд (срабатывает раз в 60 сек)',
            cooldown: '',
            type: 'Пассивный',
            image: '/classes/skills/battle-fury.png',
            isPassive: true,
          },
        ],
      },
      {
        id: 'defender',
        name: 'Защитник',
        icon: '/classes/archetypes/defender-icon.png',
        description:
          'Непробиваемый танк, защищающий союзников и контролирующий поле боя с помощью щита и оборонительных навыков.',
        role: 'Танк',
        skills: [
          {
            id: 'shield-wall',
            name: 'Стена щитов',
            description:
              'Воин поднимает щит, уменьшая получаемый урон на 40% на 5 секунд и отражая 15% полученного урона обратно.',
            cooldown: '20 сек',
            type: 'Защитный',
            image: '/classes/skills/shield-wall.png',
            isPassive: false,
          },
          {
            id: 'iron-skin',
            name: 'Железная кожа',
            description:
              'Пассивный навык: увеличивает физическую и магическую защиту на 15%, дополнительно на 10% когда здоровье ниже 40%',
            cooldown: '',
            type: 'Пассивный',
            image: '/classes/skills/iron-skin.png',
            isPassive: true,
          },
        ],
      },
    ],
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
    archetypes: [
      {
        id: 'elementalist',
        name: 'Элементалист',
        icon: '/classes/archetypes/elementalist-icon.png',
        description:
          'Магический класс, специализирующийся на использовании стихийной магии огня, воды, воздуха и земли для нанесения мощного урона.',
        role: 'Урон',
        skills: [
          {
            id: 'thunderstorm',
            name: 'Грозовая буря',
            description:
              'Призывает грозовую бурю в указанной области, которая наносит 5 ударов молнии за 4 секунды, каждый по 60% урона от магической силы.',
            cooldown: '25 сек',
            type: 'Атакующий',
            image: '/classes/skills/thunderstorm.png',
            isPassive: false,
          },
          {
            id: 'elemental-harmony',
            name: 'Стихийная гармония',
            description:
              'Пассивный навык: использование заклинания одной стихии повышает эффективность заклинаний противоположной стихии на 15% на 8 секунд.',
            cooldown: '',
            type: 'Пассивный',
            image: '/classes/skills/elemental-harmony.png',
            isPassive: true,
          },
        ],
      },
      {
        id: 'warlock',
        name: 'Чернокнижник',
        icon: '/classes/archetypes/warlock-icon.png',
        description:
          'Магический класс, специализирующийся на темной магии, проклятиях и призыве демонических существ.',
        role: 'Контроль',
        skills: [
          {
            id: 'fear',
            name: 'Страх',
            description:
              'Заставляет цель бежать в ужасе 4 секунды, не позволяя использовать способности.',
            cooldown: '20 сек',
            type: 'Контроль',
            image: '/classes/skills/fear.png',
            isPassive: false,
          },
          {
            id: 'soul-harvest',
            name: 'Жатва душ',
            description:
              'Пассивный навык: при убийстве противника восстанавливает 5% здоровья и маны, а также снижает перезарядку всех способностей на 1 секунду.',
            cooldown: '',
            type: 'Пассивный',
            image: '/classes/skills/soul-harvest.png',
            isPassive: true,
          },
        ],
      },
    ],
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
    archetypes: [
      {
        id: 'assassin',
        name: 'Ассасин',
        icon: '/classes/archetypes/assassin-icon.png',
        description:
          'Смертоносный мастер ближнего боя, использующий скрытность и внезапные атаки для устранения целей.',
        role: 'Урон',
        skills: [
          {
            id: 'backstab',
            name: 'Удар в спину',
            description:
              'Скрытно перемещается за спину противника и наносит критический удар с 200% силы атаки и 100% шансом критического удара.',
            cooldown: '15 сек',
            type: 'Атакующий',
            image: '/classes/skills/backstab.png',
            isPassive: false,
          },
          {
            id: 'shadow-mastery',
            name: 'Мастерство теней',
            description:
              'Пассивный навык: после выхода из невидимости следующая атака наносит 50% дополнительного урона и имеет 100% шанс критического удара.',
            cooldown: '',
            type: 'Пассивный',
            image: '/classes/skills/shadow-mastery.png',
            isPassive: true,
          },
        ],
      },
      {
        id: 'archer',
        name: 'Лучник',
        icon: '/classes/archetypes/archer-icon.png',
        description:
          'Мастер дальнего боя, использующий луки и арбалеты для точных и мощных атак с безопасной дистанции.',
        role: 'Урон',
        skills: [
          {
            id: 'precise-shot',
            name: 'Точный выстрел',
            description:
              'Концентрированный выстрел, наносящий 180% урона от силы атаки и игнорирующий 30% защиты цели.',
            cooldown: '10 сек',
            type: 'Атакующий',
            image: '/classes/skills/precise-shot.png',
            isPassive: false,
          },
          {
            id: 'hawk-eye',
            name: 'Соколиный глаз',
            description:
              'Пассивный навык: увеличивает дальность атак на 20% и дает 15% шанс на дополнительную атаку при использовании обычных атак.',
            cooldown: '',
            type: 'Пассивный',
            image: '/classes/skills/hawk-eye.png',
            isPassive: true,
          },
        ],
      },
    ],
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
    archetypes: [
      {
        id: 'healer',
        name: 'Целитель',
        icon: '/classes/archetypes/healer-icon.png',
        description:
          'Посвященный священнослужитель, специализирующийся на исцелении ран союзников и поддержании их жизненных сил.',
        role: 'Поддержка',
        skills: [
          {
            id: 'healing-circle',
            name: 'Круг исцеления',
            description:
              'Создает зону света, которая исцеляет всех союзников внутри на 60% от силы исцеления каждые 2 секунды в течение 10 секунд.',
            cooldown: '25 сек',
            type: 'Поддержка',
            image: '/classes/skills/healing-circle.png',
            isPassive: false,
          },
          {
            id: 'blessed-hands',
            name: 'Благословенные руки',
            description:
              'Пассивный навык: каждое третье заклинание исцеления дополнительно восстанавливает 10% от максимального здоровья цели.',
            cooldown: '',
            type: 'Пассивный',
            image: '/classes/skills/blessed-hands.png',
            isPassive: true,
          },
        ],
      },
      {
        id: 'paladin',
        name: 'Паладин',
        icon: '/classes/archetypes/paladin-icon.png',
        description:
          'Священный воин, облаченный в тяжелые доспехи, сочетающий защитные способности с умеренным исцелением и атаками света.',
        role: 'Танк',
        skills: [
          {
            id: 'consecration',
            name: 'Освящение',
            description:
              'Освящает землю под ногами, исцеляя союзников на 40% от силы исцеления и нанося урон врагам на 40% от силы атаки каждую секунду в течение 8 секунд.',
            cooldown: '30 сек',
            type: 'Поддержка',
            image: '/classes/skills/consecration.png',
            isPassive: false,
          },
          {
            id: 'divine-armor',
            name: 'Божественные доспехи',
            description:
              'Пассивный навык: увеличивает все характеристики брони на 15% и отражает 10% полученного урона обратно атакующему.',
            cooldown: '',
            type: 'Пассивный',
            image: '/classes/skills/divine-armor.png',
            isPassive: true,
          },
        ],
      },
    ],
    specializations: [],
    skills: [],
    recommendedGear: [],
    guides: [],
  },
];
