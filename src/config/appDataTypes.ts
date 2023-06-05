import { AppData } from '@graasp/sdk';
import { ImmutableCast } from '@graasp/sdk/frontend';

import { PostAppDataType } from '../types/appData';

enum APP_DATA_TYPES {
  NOTE = 'note',
}

export type NoteDataType = {
  text: string;
  color: string;
  position: { pageX: number; pageY: number };
};
export type NoteDataTypeRecord = ImmutableCast<NoteDataType>;

export type NoteType = PostAppDataType & {
  data: NoteDataType;
};
export type NoteTypeRecord = ImmutableCast<NoteType>;

export type ExistingNoteType = AppData & {
  data: NoteDataType;
};

export type ExistingNoteTypeRecord = ImmutableCast<ExistingNoteType>;

export { APP_DATA_TYPES };
