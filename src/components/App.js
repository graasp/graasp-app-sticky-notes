import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import StudentView from './modes/student/StudentView';
import { getContext } from '../actions';
import { DEFAULT_LANG, DEFAULT_MODE, MODES } from '../config/settings';
import { DEFAULT_VIEW } from '../config/views';
import { getAppInstance } from '../actions/appInstance';
import TeacherMode from './modes/teacher/TeacherMode';
import Header from './layout/Header';
import Loader from './common/Loader';

export class App extends Component {
  static propTypes = {
    i18n: PropTypes.shape({
      defaultNS: PropTypes.string,
      changeLanguage: PropTypes.func,
    }).isRequired,
    dispatchGetContext: PropTypes.func.isRequired,
    dispatchGetAppInstance: PropTypes.func.isRequired,
    appInstanceId: PropTypes.string,
    lang: PropTypes.string,
    mode: PropTypes.string,
    view: PropTypes.string,
    // headerVisible: PropTypes.bool.isRequired,
    ready: PropTypes.bool.isRequired,
    standalone: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    lang: DEFAULT_LANG,
    mode: DEFAULT_MODE,
    view: DEFAULT_VIEW,
    appInstanceId: null,
  };

  constructor(props) {
    super(props);
    // first thing to do is get the context
    props.dispatchGetContext();
    // then get the app instance
    props.dispatchGetAppInstance();
  }

  componentDidMount() {
    const { lang } = this.props;
    // set the language on first load
    this.handleChangeLang(lang);
  }

  componentDidUpdate({ lang: prevLang, appInstanceId: prevAppInstanceId }) {
    const { lang, appInstanceId, dispatchGetAppInstance } = this.props;
    // handle a change of language
    if (lang !== prevLang) {
      this.handleChangeLang(lang);
    }
    // handle receiving the app instance id
    if (appInstanceId !== prevAppInstanceId) {
      dispatchGetAppInstance();
    }
  }

  handleChangeLang = (lang) => {
    const { i18n } = this.props;
    i18n.changeLanguage(lang);
  };

  render() {
    const { mode, view, ready, standalone } = this.props;

    if (!standalone && !ready) {
      return <Loader />;
    }

    switch (mode) {
      // show teacher view when in producer (educator) mode
      case MODES.TEACHER:
      case MODES.PRODUCER:
      case MODES.EDUCATOR:
      case MODES.ADMIN:
        return (
          <>
            <Header />
            <TeacherMode view={view} />
          </>
        );

      // by default go with the consumer (learner) mode
      case MODES.STUDENT:
      case MODES.CONSUMER:
      case MODES.LEARNER:
      default:
        return (
          <>
            {/* {headerVisible || standalone ? <Header /> : null} */}
            <StudentView />
          </>
        );
    }
  }
}

const mapStateToProps = ({ context, appInstance }) => ({
  headerVisible: appInstance.content.settings.headerVisible,
  lang: context.lang,
  mode: context.mode,
  view: context.view,
  appInstanceId: context.appInstanceId,
  ready: appInstance.ready,
  standalone: context.standalone,
});

const mapDispatchToProps = {
  dispatchGetContext: getContext,
  dispatchGetAppInstance: getAppInstance,
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default withTranslation()(ConnectedApp);
