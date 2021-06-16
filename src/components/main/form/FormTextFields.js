import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormTitle from './FormTitle';
import FormDescription from './FormDescription';

const useStyles = makeStyles(() => ({
  container: { display: 'flex', flexDirection: 'column' },
}));

const FormTextFields = ({ height }) => {
  const classes = useStyles();

  return (
    <div style={{ height }} className={classes.container}>
      <FormTitle height="20%" />
      <FormDescription height="80%" />
    </div>
  );
};

FormTextFields.propTypes = {
  height: PropTypes.string.isRequired,
};

export default FormTextFields;
