import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import FinalViewHeader from './FinalViewHeader';
import FinalViewDescription from './FinalViewDescription';
import FinalViewFooter from './FinalViewFooter';
import {
  patchAppInstanceResource,
  updateNotePosition,
} from '../../../../actions';

const useStyles = makeStyles(() => ({
  noteContainer: {
    width: '15%',
    position: 'absolute',
    padding: '1%',
    boxShadow: '5px 5px 7px rgba(33,33,33,.7)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'move',
  },
}));

const NoteFinalView = ({ note, id, userId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // destructure note properties
  const {
    windowDimensions,
    position,
    color,
    title,
    description,
    minimized,
    rotation,
  } = note;
  const { innerHeight, innerWidth } = windowDimensions;
  const { pageX, pageY } = position;

  const [showActions, setShowActions] = useState(false);
  const [grabDeltaX, setGrabDeltaX] = useState(0);
  const [grabDeltaY, setGrabDeltaY] = useState(0);
  const [newPageX, setNewPageX] = useState(0);
  const [newPageY, setNewPageY] = useState(0);

  // default drag behavior is: (1) you grab div (the sticky note) in e.g. bottom right and begin dragging it,
  // (2) the point where you drop it becomes the *top left* of the div.
  // this is counterintuitive and visually unappealing
  // instead, we would expect the place where we drop the div to be the bottom right of the div (where we grabbed it)
  // hence, when drag starts, we calculate the distance between current top left of div ('origin') and the point we grabbed it
  // when we update the position in onDrag (and dispatch it in onDragEnd), we adjust for this distance to generate the expected effect
  const onDragStart = (event) => {
    const noteGrabbedX = event.pageX;
    const noteGrabbedY = event.pageY;
    const distanceBetweenGrabAndOriginX = pageX - noteGrabbedX;
    const distanceBetweenGrabAndOriginY = pageY - noteGrabbedY;
    setGrabDeltaX(distanceBetweenGrabAndOriginX);
    setGrabDeltaY(distanceBetweenGrabAndOriginY);
  };

  const onDrag = (event) => {
    setNewPageX(event.pageX + grabDeltaX);
    setNewPageY(event.pageY + grabDeltaY);
  };

  // although the onDragEnd event also supplies pageX and pageY coordinates, these misbehave in Safari (although work well on Chrome)
  // see: https://stackoverflow.com/questions/51757499/dragend-client-coordinates-incoherent-on-safari-and-firefox
  // hence, we update coordinates in the onDrag event, which doesn't have the same misbehavior
  const onDragEnd = () => {
    const updatedNote = {
      data: {
        color,
        title,
        description,
        rotation,
        minimized,
        windowDimensions: { innerHeight, innerWidth },
        position: { pageX: newPageX, pageY: newPageY },
      },
      _id: id,
    };
    dispatch(patchAppInstanceResource({ id, data: updatedNote.data }));
    dispatch(updateNotePosition(updatedNote));
  };

  return (
    <div
      className={classes.noteContainer}
      onClick={(event) => event.stopPropagation()}
      onMouseOver={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      style={{
        top: `${(pageY / innerHeight) * 100}%`,
        left: `${(pageX / innerWidth) * 100}%`,
        background: color,
        transform: `rotate(${rotation}deg)`,
        height: `${minimized ? '10%' : '20%'}`,
      }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDrag={onDrag}
      draggable
    >
      <FinalViewHeader
        title={title}
        description={description}
        color={color}
        showActions={showActions}
        id={id}
      />
      {!minimized && <FinalViewDescription description={description} />}
      <FinalViewFooter id={id} userId={userId} />
    </div>
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
    color: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    rotation: PropTypes.number.isRequired,
    minimized: PropTypes.bool.isRequired,
  }).isRequired,
  id: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  userId: PropTypes.string,
};

NoteFinalView.defaultProps = {
  userId: null,
};

export default NoteFinalView;
