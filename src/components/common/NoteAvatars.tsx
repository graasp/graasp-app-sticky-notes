import React, { FC } from 'react';

import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

import stringToColor from '../../utils/stringToColor';

interface NoteAvatarsProps {
  userName: string;
  small?: boolean;
}

const NoteAvatars: FC<NoteAvatarsProps> = ({ userName, small = false }) => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const stringAvatar = (name: string) =>
    name.length > 0
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
      : '?';

  const style = small
    ? { width: '14pt', height: '14pt', fontSize: '0.4em' }
    : { fontSize: '1em' };

  return (
    <Tooltip title={userName}>
      <Avatar
        alt={userName}
        sx={{ ...style, bgcolor: stringToColor(userName) }}
      >
        {stringAvatar(userName)}
      </Avatar>
    </Tooltip>
  );
};

export default NoteAvatars;
