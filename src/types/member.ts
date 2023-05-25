import { Member as GraaspMember } from '@graasp/sdk';

export type Member = GraaspMember & {
  color: string;
};
