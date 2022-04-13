import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { CanvasContext } from '../../../context/CanvasContext';
import FinalViewActions from './FinalViewActions';
import { TITLE_STYLE } from '../../../../constants/styles';

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: TITLE_STYLE,
  placeholderTitle: {
    fontSize: '0.9vw',
    color: 'grey',
  },
}));

const FinalViewHeader = ({ title, id, color, showActions }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const { setNoteBeingEditedId, setUserSetColor } = useContext(CanvasContext);

  const handleEdit = () => {
    // TODO: implement: if the edit button is clicked when another note is in edit mode, update that note and take it out of edit mode
    setNoteBeingEditedId(id);
    setUserSetColor(color);
  };

  const isTitleEmpty = Boolean(title?.length);

  return (
    <div className={classes.header}>
      <Typography
        className={clsx(classes.title, {
          [classes.placeholderTitle]: isTitleEmpty,
        })}
        onClick={handleEdit}
      >
        {isTitleEmpty ? t('Click to edit...') : title}
      </Typography>
      <FinalViewActions
        id={id}
        title={title}
        color={color}
        showActions={showActions}
      />
    </div>
  );
};

FinalViewHeader.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string.isRequired,
  showActions: PropTypes.bool.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

FinalViewHeader.defaultProps = {
  title: '',
};

export default FinalViewHeader;
