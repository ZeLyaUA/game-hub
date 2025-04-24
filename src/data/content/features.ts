// Определим иконки через строковые идентификаторы вместо компонентов
export type FeatureIconType = 'sword' | 'globe' | 'message-square' | 'award';

export interface Feature {
  id: string;
  iconType: FeatureIconType;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    id: 'knowledge-base',
    iconType: 'sword',
    title: 'База знаний',
    description: 'Подробные гайды, билды классов и механики боссов для топовых онлайн-игр',
  },
  {
    id: 'game-news',
    iconType: 'globe',
    title: 'Игровые новости',
    description: 'Самые свежие обновления и анонсы из мира онлайн-игр',
  },
  {
    id: 'game-chats',
    iconType: 'message-square',
    title: 'Игровые чаты',
    description: 'Общайтесь с другими игроками, делитесь опытом и находите напарников',
  },
  {
    id: 'esports',
    iconType: 'award',
    title: 'Киберспорт',
    description: 'Турниры, соревнования и призовые фонды для соревновательных игроков',
  },
];

export default features;
