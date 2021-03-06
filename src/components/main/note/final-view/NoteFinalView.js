import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FinalViewHeader from './FinalViewHeader';
import FinalViewFooter from './FinalViewFooter';
import { useMutation, MUTATION_KEYS } from '../../../../config/queryClient';
import { ACTION_TYPES } from '../../../../config/actionTypes';
import { DEFAULT_ANONYMOUS_USERNAME } from '../../../../config/settings';

const useStyles = makeStyles(() => ({
  noteContainer: {
    maxWidth: '15%',
    position: 'absolute',
    padding: '0.7em 0.8em',
    boxShadow: '5px 5px 7px rgba(33,33,33,.7)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    cursor: 'move',
    borderRadius: '0.3em',
    width: '12em',
  },
}));

const NoteFinalView = ({ note, id, userName, newPageX, newPageY }) => {
  const classes = useStyles();
  // destructure note properties
  const {
    windowDimensions,
    position,
    color,
    title,
    description,
    minimized,
    rotation,
    category,
  } = note;
  const { innerHeight, innerWidth } = windowDimensions;
  const { pageX, pageY } = position;

  const [showActions, setShowActions] = useState(false);
  // grabDeltaX/Y captures the distance between the point we grabbed a div (note) and its top left
  // (this happens in onDragStart below)
  // when we update the final position of the note (finalPageX/Y), we adjust for this distance
  // (see the note above onDragStart below for further details)
  const [grabDeltaX, setGrabDeltaX] = useState(0);
  const [grabDeltaY, setGrabDeltaY] = useState(0);

  const { mutate: patchAppData } = useMutation(MUTATION_KEYS.PATCH_APP_DATA);
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);

  // default drag behavior is: (1) you grab div (the sticky note) in e.g. bottom right and begin dragging it,
  // (2) the point where you drop it becomes the *top left* of the div.
  // this is counterintuitive and visually unappealing
  // instead, we would expect the place where we drop the div to be the bottom right of the div (where we grabbed it)
  // hence, when drag starts, we calculate the distance between current top left of div ('origin') and the point we grabbed it
  // when we update the position in onDragEnd, we adjust for this distance to generate the expected effect
  const onDragStart = (event) => {
    const noteGrabbedX = event.pageX;
    const noteGrabbedY = event.pageY;
    const distanceBetweenGrabAndOriginX = pageX - noteGrabbedX;
    const distanceBetweenGrabAndOriginY = pageY - noteGrabbedY;
    setGrabDeltaX(distanceBetweenGrabAndOriginX);
    setGrabDeltaY(distanceBetweenGrabAndOriginY);
  };

  const onDragEnd = () => {
    const finalPageX = newPageX + grabDeltaX;
    const finalPageY = newPageY + grabDeltaY;
    const updatedNote = {
      data: {
        category,
        color,
        title,
        description,
        rotation,
        minimized,
        windowDimensions: { innerHeight, innerWidth },
        position: {
          pageX: finalPageX,
          pageY: finalPageY,
        },
      },
      id,
    };

    patchAppData({
      data: updatedNote.data,
      id: updatedNote.id,
    });
    postAction({
      type: ACTION_TYPES.MOVE,
      data: {
        note: updatedNote.data,
        id: updatedNote.id,
      },
    });
  };

  const handleChangeMinimize = (isMin) => {
    const updatedNote = {
      ...note,
      minimized: isMin,
    };

    patchAppData({
      data: updatedNote,
      id,
    });
  };

  /* eslint-disable jsx-a11y/click-events-have-key-events */
  /* The click event is used only to prevent its propagation to the canvas. */
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className={classes.noteContainer}
        onClick={(event) => event.stopPropagation()}
        onMouseOver={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        onFocus={() => setShowActions(true)}
        onBlur={() => setShowActions(false)}
        style={{
          top: `${(pageY / innerHeight) * 100}%`,
          left: `${(pageX / innerWidth) * 100}%`,
          background: color,
          transform: `rotate(${rotation}deg)`,
        }}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        draggable
      >
        <FinalViewHeader
          title={title}
          description={description}
          color={color}
          showActions={showActions}
          minimized={minimized}
          id={id}
          onChangeMinimize={handleChangeMinimize}
        />
        {!minimized && <FinalViewFooter id={id} userName={userName} />}
      </div>
    </>
  );
};

NoteFinalView.propTypes = {
  note: PropTypes.shape({
    windowDimensions: PropTypes.shape({
      innerHeight: PropTypes.number.isRequired,
      innerWidth: PropTypes.number.isRequired,
    }),
    position: PropTypes.shape({
      pageX: PropTypes.number.isRequired,
      pageY: PropTypes.number.isRequired,
    }),
    color: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    rotation: PropTypes.number.isRequired,
    minimized: PropTypes.bool.isRequired,
    category: PropTypes.string,
  }).isRequired,
  id: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  userName: PropTypes.string,
  newPageX: PropTypes.number,
  newPageY: PropTypes.number,
};

NoteFinalView.defaultProps = {
  userName: DEFAULT_ANONYMOUS_USERNAME,
  newPageX: null,
  newPageY: null,
};

export default NoteFinalView;
