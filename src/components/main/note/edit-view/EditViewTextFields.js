import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import EditViewTitle from './EditViewTitle';

const useStyles = makeStyles(() => ({
  container: { display: 'flex', flexDirection: 'column' },
}));

const EditViewTextFields = ({ height, title, onChange, onConfirm }) => {
  const classes = useStyles();

  let editedTitle = title;

  const handleTitleChange = (newTitle) => {
    editedTitle = newTitle;
    onChange(editedTitle);
  };

  return (
    <div style={{ height }} className={classes.container}>
      <EditViewTitle
        height="20%"
        title={title}
        onChange={handleTitleChange}
        onEnter={onConfirm}
      />
    </div>
  );
};

EditViewTextFields.propTypes = {
  height: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default EditViewTextFields;
