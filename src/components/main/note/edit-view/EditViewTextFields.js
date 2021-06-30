import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import EditViewTitle from './EditViewTitle';
import EditViewDescription from './EditViewDescription';

const useStyles = makeStyles(() => ({
  container: { display: 'flex', flexDirection: 'column' },
}));

const EditViewTextFields = ({ height }) => {
  const classes = useStyles();

  return (
    <div style={{ height }} className={classes.container}>
      <EditViewTitle height="20%" />
      <EditViewDescription height="80%" />
    </div>
  );
};

EditViewTextFields.propTypes = {
  height: PropTypes.string.isRequired,
};

export default EditViewTextFields;
