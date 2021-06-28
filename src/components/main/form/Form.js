import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import FormTextFields from './FormTextFields';
import ColorPalette from './ColorPalette';
import FormActions from './FormActions';

const useStyles = makeStyles(() => ({
  form: {
    width: '17.5%',
    height: '25%',
    position: 'absolute',
    boxShadow: '5px 5px 7px rgba(33,33,33,.7)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'default',
  },
}));

const Form = () => {
  const activeForm = useSelector(({ canvas }) => canvas.activeForm);
  const { windowDimensions, position, color } = activeForm;
  const { innerHeight, innerWidth } = windowDimensions;
  const { pageX, pageY } = position;
  const classes = useStyles();

  return (
    <div
      className={classes.form}
      onClick={(event) => event.stopPropagation()}
      style={{
        top: `${(pageY / innerHeight) * 100}%`,
        left: `${(pageX / innerWidth) * 100}%`,
        background: color,
      }}
    >
      <FormTextFields height="65%" />
      <ColorPalette height="20%" />
      <FormActions height="15%" />
    </div>
  );
};

export default Form;
