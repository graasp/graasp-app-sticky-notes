import { Member, MemberType } from '@graasp/sdk';

export const MEMBERS: { [key: string]: Member } = {
  ANNA: {
    id: '0f0a2774-a965-4b97-afb4-bccc3796e060',
    name: 'Anna Montana',
    email: 'anna@graasp.local',
    extra: {},
    type: MemberType.Individual,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  BOB: {
    id: '1f0a2774-a965-4b97-afb4-bccc3796e060',
    name: 'Bob Dylan',
    email: 'bob@graasp.local',
    extra: {},
    type: MemberType.Individual,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

export const CURRENT_MEMBER = MEMBERS.ANNA;
