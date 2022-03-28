/* eslint-disable no-restricted-exports */ // TODO: Fix this
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { DEFAULT_NOTE_COLOR } from '../../constants/constants';

const CanvasContext = React.createContext();

  const CanvasProvider = ({ children }) => {
    const [noteBeingEditedId, setNoteBeingEditedId] = useState(null);
    const [userSetColor, setUserSetColor] = useState(DEFAULT_NOTE_COLOR);
    
    /* eslint-disable-next-line react/jsx-no-constructed-context-values */
    return <CanvasContext.Provider value={{
      noteBeingEditedId,
      setNoteBeingEditedId,
      userSetColor,
      setUserSetColor
      }}>{children}</CanvasContext.Provider>;
};

CanvasProvider.propTypes = {
  children: PropTypes.node,
};

CanvasProvider.defaultProps = {
  children: null,
};

export { CanvasContext, CanvasProvider  };