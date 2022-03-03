import { sub } from 'date-fns';

export const _activity_options = [
  {
    key: 'not1',
    label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut vestibulum turpis',
  },
  {
    key: 'not2',
    label: 'In posuere nulla ut convallis interdum. Aenean tincidunt, dolor ac volutpat sodales, neque elit ullamcorper nulla, at ornare ex enim vel orci.',
  },
  { key: 'not3', label: 'Ut ultrices purus vel tortor viverra.' },
];

export const _application_options = [
  { key: 'not4', label: 'Phasellus cursus, odio eget volutpat commodo' },
  { key: 'not5', label: 'Augue sapien sagittis eros, ac dignissim turpis lacus sed purus' },
  { key: 'not6', label: 'Nulla at faucibus tellus.' },
];

export const _notifications = [
  {
    id: '1',
    title: 'Sua solicitação foi recebida!',
    description: 'adição de novos colaboradores',
    avatar: null,
    type: 'order_shipped',
    createdAt: sub(new Date(), { days: 1, hours: 1 }),
    isUnRead: true
  },
  {
    id: '2',
    title: 'Sylvan King',
    description: 'completou seu perfil',
    avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_2.jpg',
    type: 'friend_interactive',
    createdAt: sub(new Date(), { days: 2, hours: 2 }),
    isUnRead: true
  },
  {
    id: '3',
    title: 'Sua solicitação foi realizada!',
    description: 'cinco novos usuários foram adicionados',
    avatar: null,
    type: 'order_placed',
    createdAt: sub(new Date(), { days: 3, hours: 3 }),
    isUnRead: false
  },
  {
    id: '4',
    title: 'Sua exportação foi realizada!',
    description: 'tempo médio de percurso',
    avatar: null,
    type: 'order_placed',
    createdAt: sub(new Date(), { days: 4, hours: 4 }),
    isUnRead: false
  },
  {
    id: '5',
    title: 'Exportação em processamento',
    description: 'tempo médio de percurso',
    avatar: null,
    type: 'order_shipped',
    createdAt: sub(new Date(), { days: 5, hours: 5 }),
    isUnRead: false
  }
];

export const _notifications_app = [
  {
    id: '1',
    title: 'Atualize seu endereço!',
    description: 'precisamos que o mantenha atualizado',
    avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_2.jpg',
    type: 'order_shipped',
    createdAt: sub(new Date(), { days: 1, hours: 1 }),
    isUnRead: true
  },
  {
    id: '2',
    title: 'Suas configurações foram atualizadas!',
    description: 'tudo certo!',
    avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_2.jpg',
    type: 'friend_interactive',
    createdAt: sub(new Date(), { days: 2, hours: 2 }),
    isUnRead: true
  }
];

