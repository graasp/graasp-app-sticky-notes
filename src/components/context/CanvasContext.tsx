/* eslint-disable react/jsx-no-constructed-context-values */
import React, { FC, PropsWithChildren, useContext, useState } from 'react';

import { DEFAULT_NOTE_COLOR } from '../../config/constants';

type CanvasContextType = {
  noteBeingEditedId: string | null;
  setNoteBeingEditedId: (id: string | null) => void;
  userSetColor: string;
  setUserSetColor: (color: string) => void;
  highlightNoteBeingEdited: boolean;
  setHighlightNoteBeingEdited: (highlight: boolean) => void;
  noteBeingTransformedId: string | null;
  setNoteBeingTransformedId: (id: string | null) => void;
};

const CanvasContext = React.createContext<CanvasContextType>({
  noteBeingEditedId: null,
  setNoteBeingEditedId: () => null,
  userSetColor: DEFAULT_NOTE_COLOR,
  setUserSetColor: () => null,
  highlightNoteBeingEdited: false,
  setHighlightNoteBeingEdited: () => null,
  noteBeingTransformedId: null,
  setNoteBeingTransformedId: () => null,
});

const CanvasProvider: FC<PropsWithChildren> = ({ children }) => {
  const [noteBeingEditedId, setNoteBeingEditedId] = useState<string | null>(
    null,
  );
  const [noteBeingTransformedId, setNoteBeingTransformedId] = useState<
    string | null
  >(null);
  const [userSetColor, setUserSetColor] = useState<string>(DEFAULT_NOTE_COLOR);
  const [highlightNoteBeingEdited, setHighlightNoteBeingEdited] =
    useState<boolean>(false);

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

const useCanvasContext = (): CanvasContextType => useContext(CanvasContext);

export { useCanvasContext, CanvasProvider };
