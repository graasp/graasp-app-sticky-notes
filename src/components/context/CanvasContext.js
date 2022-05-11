/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { DEFAULT_NOTE_COLOR } from '../../constants/constants';

const CanvasContext = React.createContext();

const CanvasProvider = ({ children }) => {
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

CanvasProvider.propTypes = {
  children: PropTypes.node,
};

CanvasProvider.defaultProps = {
  children: null,
};

export { CanvasContext, CanvasProvider };
