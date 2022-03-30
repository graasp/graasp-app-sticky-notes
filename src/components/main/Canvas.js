import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { generateRandomRotationAngle } from '../../utils/canvas';
import Settings from '../modes/teacher/Settings';
import ColorSettings from './ColorSettings';
import BackgroundImage from './BackgroundImage';
import { ACTION_TYPES } from '../../config/actionTypes';
import { APP_DATA_TYPES } from '../../config/appDataTypes';
import { useAppSettings } from '../context/appData';
import { useMutation, MUTATION_KEYS } from '../../config/queryClient';
import { CanvasContext } from '../context/CanvasContext';
import {
  APP_DATA_VISIBLITIES,
  DEFAULT_PERMISSION,
  PERMISSION_LEVELS,
} from '../../config/settings';
import { APP_SETTINGS } from '../../constants/constants';
import { Context } from '../context/ContextContext';
import NoteContainer from './NoteContainer';
// import vpc from './vpc.png';
// import VPC from './subcanvas/VPC';

const useStyles = makeStyles(() => ({
  mainContainer: {
    width: '100%',
    height: '100%',
    cursor: 'cell',
  },
}));

const Canvas = () => {
  const classes = useStyles();
  const { mutate: postAppData } = useMutation(MUTATION_KEYS.POST_APP_DATA);
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);

  const [ newPageX, setNewPageX ] = useState(null);
  const [ newPageY, setNewPageY ] = useState(null);
  let tmpNewPageX;
  let tmpNewPageY;
  
  const { userSetColor, noteBeingEditedId } = useContext(CanvasContext);
  const [ backgroundToggleSetting, setBackgroundToggleSetting ] = useState(false);
  const context = useContext(Context);

  const permissionLevel = context?.get('permission', DEFAULT_PERMISSION);
  const [edit, setEdit] = useState(false);

  const { data: appSettings, isSuccess } = useAppSettings();

  useEffect(() => {
    if(isSuccess) {
      setBackgroundToggleSetting(Boolean(appSettings?.find(
        ({ name }) => name === APP_SETTINGS.BACKGROUND_TOGGLE,
      )?.data.toggle ?? false));
    }
  });

  const handleCanvasClick = (event) => {
    if(noteBeingEditedId===null) {
      // add a new note to the canvas
      const { innerHeight, innerWidth } = window;
      const { pageX, pageY } = event;
      const newNote = {
        windowDimensions: { innerHeight, innerWidth },
        position: { pageX, pageY },
        color: userSetColor,
        rotation: generateRandomRotationAngle(),
        minimized: false,
      };

      postAppData({
        data: newNote,
        type: APP_DATA_TYPES.NOTE,
        visibility: APP_DATA_VISIBLITIES.ITEM,
      });
      setEdit(true);
      postAction({
        type: ACTION_TYPES.ADD,
        data: {
          note: newNote,
          id: newNote.id,
        },
      });
    }
  };

  /* The <div> element has a child <button> element that allows keyboard interaction */
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className={classes.mainContainer}
        onClick={handleCanvasClick}
        onDragOver={(event) => {
          event.stopPropagation();
          event.preventDefault();
          // when a note is dragged over this main div, the onDragOver event registers the coordinates (pageX, pageY) of the dragged note
          // these new coordinates are passed down to the note, where, once the drag event is complete, they update the final coordinates (in state + API)
          tmpNewPageX = event.pageX;
          tmpNewPageY = event.pageY;
        }}
        onDrop={(event) => {
          event.preventDefault();
          setNewPageX(tmpNewPageX);
          setNewPageY(tmpNewPageY);
        }}
      >
        {/* <VPC emitCategory={handleCategoryChange} /> */}
        <NoteContainer edit={edit} newPageX={newPageX} newPageY={newPageY} />
        {backgroundToggleSetting && <BackgroundImage />}
        {(permissionLevel === PERMISSION_LEVELS.WRITE || permissionLevel === PERMISSION_LEVELS.ADMIN) && <Settings />}
        <ColorSettings />
      </div>
    </>
  );
};

export default Canvas;
