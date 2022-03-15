import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import EditViewTitle from './EditViewTitle';
// import EditViewDescription from './EditViewDescription';

const useStyles = makeStyles(() => ({
  container: { display: 'flex', flexDirection: 'column' },
}));

const EditViewTextFields = ({ height, title, /* description, */ onChange, onConfirm }) => {
  const classes = useStyles();

  let editedTitle = title;
  // let editedDescription = description;

  const handleTitleChange = (newTitle) => {
    editedTitle = newTitle;
    onChange(editedTitle /* , editedDescription */);
  };

  /* const handleDescriptionChange = (newDescription) => {
    editedDescription = newDescription;
    onChange(editedTitle, editedDescription);
  }; */

  return (
    <div style={{ height }} className={classes.container}>
      <EditViewTitle height="20%" title={editedTitle} onChange={handleTitleChange} onEnter={onConfirm}/>
      {/* <EditViewDescription height="80%" description={editedDescription} onChange={handleDescriptionChange} /> */}
    </div>
  );
};

EditViewTextFields.propTypes = {
  height: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  // description: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default EditViewTextFields;
