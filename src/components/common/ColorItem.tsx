import React, { FC } from 'react';

import { styled } from '@mui/material';

const Color = styled('div')(() => ({
  width: '2vw',
  height: '2vw',
  cursor: 'pointer',
  borderRadius: '50%',
  background: 'darkgreen',
  marginBottom: 1,
}));

interface ColorItemProps {
  selectedColor: string;
  itemColor: string;
  setColor?: (c: string) => void;
}

const ColorItem: FC<ColorItemProps> = ({
  itemColor,
  selectedColor,
  setColor: setColorUnsafe,
}) => {
  const setColor = (c: string): void => {
    if (typeof setColorUnsafe !== 'undefined') {
      setColorUnsafe(c);
    }
  };
  return (
    <Color
      sx={{
        background: itemColor,
        border: selectedColor === itemColor ? '1px solid grey' : 'none',
      }}
      key={selectedColor}
      onClick={(event) => {
        event.stopPropagation();
        setColor(itemColor);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.stopPropagation();
          setColor(itemColor);
        }
      }}
    />
  );
};

export default ColorItem;
