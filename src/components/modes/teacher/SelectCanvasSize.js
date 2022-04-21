import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Select, MenuItem, InputAdornment, TextField } from '@material-ui/core';
import { Button } from '@graasp/ui';
import { MUTATION_KEYS, useMutation } from '../../../config/queryClient';
import { APP_SETTINGS } from '../../../constants/constants';
import { useAppSettings } from '../../context/appData';
import { DEFAULT_CANVAS_DIMENSIONS } from '../../../config/settings';
import CANVAS_DIMENSIONS from '../../../constants/canvas_dimensions';

const useStyles = makeStyles(() => ({
  toggleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  headerText: {
    fontSize: '1.05vw',
  },
  headerDisabled: {
    color: 'grey',
  },
  rightContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

const DEFAULT_CANVAS_DIMENSIONS_SETTING = {
  name: APP_SETTINGS.CANVAS_DIMENSIONS,
  data: CANVAS_DIMENSIONS.get(DEFAULT_CANVAS_DIMENSIONS),
};

const SelectCanvasSize = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { mutate: postAppSetting } = useMutation(
    MUTATION_KEYS.POST_APP_SETTING,
  );

  const { mutate: patchAppSetting } = useMutation(
    MUTATION_KEYS.PATCH_APP_SETTING,
  );

  const [dimensionsSelected, setDimensionsSelected] = useState();
  const [dimensionsSelectedKey, setDimensionsSelectedKey] = useState(
    DEFAULT_CANVAS_DIMENSIONS,
  );

  const [customWidth, setCustomWidth] = useState();
  const [customHeight, setCustomHeight] = useState();

  const { data: appSettings, isSuccess } = useAppSettings();

  useEffect(() => {
    if (isSuccess) {
      const size = appSettings?.find(
        ({ name }) => name === APP_SETTINGS.CANVAS_DIMENSIONS,
      );
      if (size) {
        const s =
          appSettings?.find(
            ({ name }) => name === APP_SETTINGS.CANVAS_DIMENSIONS,
          ) || DEFAULT_CANVAS_DIMENSIONS_SETTING;
        setDimensionsSelected(s);
        setDimensionsSelectedKey(s?.data?.key ?? DEFAULT_CANVAS_DIMENSIONS);
        setCustomWidth(parseFloat(s?.data?.width));
        setCustomHeight(parseFloat(s?.data?.height));
      }
    }
  }, [appSettings, isSuccess]);

  const handleSelect = (event) => {
    const dimSel = {
      ...CANVAS_DIMENSIONS.get(event.target.value),
      key: event.target.value,
    };
    if (event.target.value === 'custom') {
      dimSel.height = `${customHeight.toString()}mm`;
      dimSel.width = `${customWidth.toString()}mm`;
    }
    const newDimensionsSetting = {
      ...(dimensionsSelected ?? DEFAULT_CANVAS_DIMENSIONS_SETTING),
      data: dimSel,
    };
    if (dimensionsSelected && dimensionsSelected?.id) {
      patchAppSetting(newDimensionsSetting);
    } else {
      postAppSetting(newDimensionsSetting);
    }
    setDimensionsSelectedKey(event.target.value);
  };

  const saveCustomDimensions = (event) => {
    const fakeEvent = {
      ...event,
      target: {
        value: 'custom',
      },
    };
    handleSelect(fakeEvent);
  };

  const generateMenuItem = () => {
    const children = [];
    CANVAS_DIMENSIONS.forEach((value, key) => {
      children.push(<MenuItem value={key}>{value?.name}</MenuItem>);
    });
    return children;
  };

  return (
    <>
      <div className={classes.toggleContainer}>
        <Typography className={classes.headerText}>
          {t('Select canvas size')}
        </Typography>
        <FormControlLabel
          control={
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dimensionsSelectedKey}
              label="Size"
              onChange={handleSelect}
            >
              {generateMenuItem()}
            </Select>
          }
        />
      </div>
      {dimensionsSelectedKey === 'custom' && (
          <div className={classes.toggleContainer}>
            <Typography className={classes.headerText}>
              {t('Enter custom size')}
            </Typography>
            <FormControlLabel
              control={
                <>
                  <TextField
                    label="Width"
                    value={customWidth}
                    onChange={(e) => {
                      setCustomWidth(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">mm</InputAdornment>
                    }
                    type="number"
                    size="small"
                  />
                  <TextField
                    label="Height"
                    value={customHeight}
                    onChange={(e) => {
                      setCustomHeight(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">mm</InputAdornment>
                    }
                    type="number"
                    size="small"
                  />
                  <Button
                  variant="contained"
                  color="secondary"
                  onClick={saveCustomDimensions}
                >
                  {t('Update')}
                </Button>
                </>
              }
            />
          </div>
      )}
    </>
  );
};

export default SelectCanvasSize;
