import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withTranslation } from 'react-i18next';
import { closeSettings, patchAppInstance } from '../../../actions';
import Loader from '../../common/Loader';
import { DEFAULT_SETTINGS } from '../../../reducers/appInstance';

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = (theme) => ({
  paper: {
    position: 'absolute',
    width: theme.spacing(50),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
  button: {
    marginLeft: theme.spacing(),
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(3),
    float: 'right',
  },
  textField: {
    marginTop: theme.spacing(3),
  },
  formControl: {
    marginTop: theme.spacing(1),
    width: '100%',
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
});

class Settings extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      paper: PropTypes.string,
      divider: PropTypes.string,
      textField: PropTypes.string,
      button: PropTypes.string,
    }).isRequired,
    open: PropTypes.bool.isRequired,
    activity: PropTypes.bool.isRequired,
    settings: PropTypes.shape({
      headerVisible: PropTypes.bool.isRequired,
    }).isRequired,
    t: PropTypes.func.isRequired,
    dispatchCloseSettings: PropTypes.func.isRequired,
    dispatchPatchAppInstance: PropTypes.func.isRequired,
    i18n: PropTypes.shape({
      defaultNS: PropTypes.string,
    }).isRequired,
  };

  state = (() => {
    const { settings } = this.props;

    return {
      settings,
    };
  })();

  handleSave = () => {
    const { dispatchPatchAppInstance, dispatchCloseSettings } = this.props;
    const { settings } = this.state;

    // todo: trim string values on save
    dispatchPatchAppInstance({
      data: settings,
    });
    dispatchCloseSettings();
  };

  handleChangeSwitch = (key) => ({ target: { checked } }) => {
    this.setState((prevState) => ({
      settings: {
        ...prevState.settings,
        [key]: checked,
      },
    }));
  };

  handleChangeTextField = (key) => ({ target: { value } }) => {
    this.setState((prevState) => {
      // get the previous state's settings
      const settings = { ...prevState.settings };
      // use lodash to be able to use dot and array notation
      _.set(settings, key, value);
      return { settings };
    });
  };

  handleChangeIntegerField = (key) => ({ target: { value } }) => {
    this.setState((prevState) => {
      // get the previous state's settings
      const settings = { ...prevState.settings };
      // parse integer and fall back to default if not a number
      const parsedValue = parseInt(value, 10) || DEFAULT_SETTINGS[key];
      // use lodash to be able to use dot and array notation
      _.set(settings, key, parsedValue);
      return { settings };
    });
  };

  handleClose = () => {
    const { dispatchCloseSettings, settings } = this.props;
    this.setState({ ...DEFAULT_SETTINGS, ...settings });
    dispatchCloseSettings();
  };

  renderModalContent() {
    const { t, activity, classes, settings: settingsProp } = this.props;
    const { settings } = this.state;
    const { headerVisible } = settings;

    const hasChanged = !_.isEqual(settingsProp, settings);

    if (activity) {
      return <Loader />;
    }

    const headerVisibleSwitchControl = (
      <Switch
        color="primary"
        checked={headerVisible}
        onChange={this.handleChangeSwitch('headerVisible')}
        value="headerVisibility"
      />
    );

    return (
      <>
        <FormControlLabel
          control={headerVisibleSwitchControl}
          label={t('Show Header to Students')}
        />
        <Divider className={classes.divider} />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handleSave}
          disabled={!hasChanged}
        >
          {t('Save')}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={this.handleClose}
        >
          {t('Cancel')}
        </Button>
      </>
    );
  }

  render() {
    const { open, classes, t } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h5" id="modal-title">
              {t('Settings')}
            </Typography>
            {this.renderModalContent()}
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ layout, appInstance }) => ({
  open: layout.settings.open,
  settings: appInstance.content.settings,
  activity: appInstance.activity.length,
});

const mapDispatchToProps = {
  dispatchCloseSettings: closeSettings,
  dispatchPatchAppInstance: patchAppInstance,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
const TranslatedComponent = withTranslation()(ConnectedComponent);

export default withStyles(styles)(TranslatedComponent);
