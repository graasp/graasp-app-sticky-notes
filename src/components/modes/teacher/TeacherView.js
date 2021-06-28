import React from 'react';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Canvas from '../../main/Canvas';

const styles = () => ({});

const TeacherView = () => <Canvas />;

const StyledComponent = withStyles(styles)(TeacherView);

export default withTranslation()(StyledComponent);
