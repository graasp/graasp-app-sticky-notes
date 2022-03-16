/* eslint-disable no-restricted-exports */ // TODO: Fix this
import React from 'react';

const CanvasContext = React.createContext({
    noteBeingEditedId: null,
  });

export { CanvasContext as default  };