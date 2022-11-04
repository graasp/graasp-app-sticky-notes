/* eslint-disable react/jsx-no-constructed-context-values */
import React, { FC, PropsWithChildren, useState } from 'react';

import { DEFAULT_NOTE_COLOR } from '../../config/constants';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any
const uselessFunc = (_a: any): void => {};

const CanvasContext = React.createContext({
  noteBeingEditedId: null,
  setNoteBeingEditedId: uselessFunc,
  userSetColor: DEFAULT_NOTE_COLOR,
  setUserSetColor: uselessFunc,
  highlightNoteBeingEdited: false,
  setHighlightNoteBeingEdited: uselessFunc,
  noteBeingTransformedId: null,
  setNoteBeingTransformedId: uselessFunc,
});

const CanvasProvider: FC<PropsWithChildren> = ({ children }) => {
  const [noteBeingEditedId, setNoteBeingEditedId] = useState(null);
  const [noteBeingTransformedId, setNoteBeingTransformedId] = useState(null);
  const [userSetColor, setUserSetColor] = useState(DEFAULT_NOTE_COLOR);
  const [highlightNoteBeingEdited, setHighlightNoteBeingEdited] =
    useState(false);

  return (
    <CanvasContext.Provider
      value={{
        noteBeingEditedId,
        setNoteBeingEditedId,
        userSetColor,
        setUserSetColor,
        highlightNoteBeingEdited,
        setHighlightNoteBeingEdited,
        noteBeingTransformedId,
        setNoteBeingTransformedId,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export { CanvasContext, CanvasProvider };
