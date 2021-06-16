import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  note: {
    width: '15%',
    height: '20%',
    position: 'absolute',
    padding: '1%',
    boxShadow: '5px 5px 7px rgba(33,33,33,.7)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'default',
  },
  title: {
    fontSize: '1.2vw',
    fontWeight: 600,
  },
  description: { fontSize: '1vw', overflow: 'auto' },
  addedBy: { fontSize: '0.8vw', color: '#383838', textAlign: 'right' },
  author: { fontWeight: 600 },
}));

const Note = ({ note }) => {
  const {
    windowDimensions,
    position,
    color,
    title,
    description,
    rotation,
  } = note;
  const { innerHeight, innerWidth } = windowDimensions;
  const { pageX, pageY } = position;
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div
      className={classes.note}
      onClick={(event) => event.stopPropagation()}
      style={{
        top: `${(pageY / innerHeight) * 100}%`,
        left: `${(pageX / innerWidth) * 100}%`,
        background: color,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <Typography className={classes.title}>{title}</Typography>
      <Typography className={classes.description}>{description}</Typography>
      <Typography className={classes.addedBy}>
        {t('Added by ')}
        <span className={classes.author}>Anon</span>
      </Typography>
    </div>
  );
};

Note.propTypes = {
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
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    rotation: PropTypes.number.isRequired,
  }).isRequired,
};

export default Note;
