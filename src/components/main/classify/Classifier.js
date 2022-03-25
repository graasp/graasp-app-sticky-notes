import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// import MoodIcon from '@material-ui/icons/Mood';
// import { useTranslation } from 'react-i18next';
import './classifier.css';


const useStyles = makeStyles(() => ({
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '12em',
    height: '12em',
    borderRadius: '6em',
    backgroundColor: 'grey',
    opacity: '0.6',
  },
}));

const Classifier = ({category, emitCategory, children}) => {
  const classes = useStyles();
  const tag = "TAG";
  const [/* isOver, */ setIsOver] = useState(false);

  const handleDragEnter = (e) => {
    console.log(e, tag);
    const id = e.dataTransfer.getData("text/plain");
    console.log(id, category);
    setIsOver(true);
    emitCategory(id, category);
  }

  return (
    <div className={classes.mainContainer}
    onDragEnter={handleDragEnter}
    onDragLeave={() => {
      setIsOver(false);
    }}
    onDrop={(e) => {
      e.preventDefault();
    }}
    >
      {/* <MoodIcon className={isOver && "iconOnOver"} /> */}
      {children}
    </div>
  );
};

Classifier.propTypes = {
  category: PropTypes.string.isRequired,
  emitCategory: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.elementType),
};

Classifier.defaultProps = {
  children: null,
}

export default Classifier;
