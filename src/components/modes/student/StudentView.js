import React from 'react';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({});

const StudentView = () => <div />;

const StyledComponent = withStyles(styles)(StudentView);

export default withTranslation()(StyledComponent);
