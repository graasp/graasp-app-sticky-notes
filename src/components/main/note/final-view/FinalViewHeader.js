import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { CanvasContext } from '../../../context/CanvasContext';
import FinalViewActions from './FinalViewActions';

const titleStyle = {
  fontSize: '1vw',
  fontWeight: 200,
  overflowWrap: 'anywhere',
  cursor: 'text',
  textAlign: 'justify',
  padding: 'none',
};

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    ...titleStyle,
  },
  placeholderTitle: {
    ...titleStyle,
    fontSize: '0.9vw',
    color: 'grey',
  },
}));

const FinalViewHeader = ({
  title,
  id,
  color,
  showActions /* , description, color, id, minimized, onChangeMinimize */,
}) => {
  const classes = useStyles();

  const { setNoteBeingEditedId, setUserSetColor } = useContext(CanvasContext);

  const handleEdit = () => {
    // if the edit button is clicked when another note is in edit mode, update that note and take it out of edit mode
    // TODO: implement this behaviour.
    /* if (noteBeingEditedId) {
      console.log('Save note');
    } */
    setNoteBeingEditedId(id);
    setUserSetColor(color);
  };

  const isTitleEmpty = title === '';

  return (
    <div className={classes.header}>
      <Typography
        className={isTitleEmpty ? classes.placeholderTitle : classes.title}
        onClick={handleEdit}
      >
        {isTitleEmpty ? 'Click to edit...' : title}
      </Typography>
      <FinalViewActions
        id={id}
        title={title}
        color={color}
        showActions={showActions}
        // minimized={minimized}
        // onChangeMinimize={onChangeMinimize}
      />
    </div>
  );
};

FinalViewHeader.propTypes = {
  title: PropTypes.string,
  // description: PropTypes.string,
  color: PropTypes.string.isRequired,
  showActions: PropTypes.bool.isRequired,
  // minimized: PropTypes.bool.isRequired,
  // onChangeMinimize: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

FinalViewHeader.defaultProps = {
  title: '',
  // description: '',
  // color: '#DFD59F',
};

export default FinalViewHeader;
