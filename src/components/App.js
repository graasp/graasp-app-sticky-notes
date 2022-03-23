/* import React, { Component } from 'react'; */
import React, { useContext } from 'react';
/* import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { getContext } from '../actions';
import { DEFAULT_LANG, DEFAULT_MODE, MODES } from '../config/settings';
import { getAppInstance } from '../actions/appInstance';
import Loader from './common/Loader'; */
import TeacherView from './modes/teacher/TeacherView';
import StudentView from './modes/student/StudentView';
import { Context } from './context/ContextContext';
import { TokenProvider } from './context/TokenContext';
import { DEFAULT_PERMISSION } from '../config/settings';
import { CONTEXTS } from '../config/contexts';
import AnalyzerView from './modes/analyzer/AnalyzerView';

export const App = () => {
  const context = useContext(Context);

  const renderContent = () => {
    if(context?.get('context', ) === CONTEXTS.ANALYZER){
      return <AnalyzerView />
    }
    
    switch (context?.get('permission', DEFAULT_PERMISSION)) {
      // show teacher view when in producer (educator) mode
      case 'write':
      case 'admin':
        // case permission:
        return <TeacherView />;

      // by default go with the consumer (learner) mode
      case 'read':
      default:
        return <StudentView />;
    }
  };

  return <TokenProvider>{renderContent()}</TokenProvider>;
};

export default App;

/* export class App extends Component {
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
    ready: PropTypes.bool.isRequired,
    standalone: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    lang: DEFAULT_LANG,
    mode: DEFAULT_MODE,
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
    const { mode, ready, standalone } = this.props;

    if (!standalone && !ready) {
      return <Loader />;
    }

    switch (mode) {
      // show teacher view when in producer (educator) mode
      case MODES.TEACHER:
      case MODES.PRODUCER:
      case MODES.EDUCATOR:
      case MODES.ADMIN:
        return <TeacherView />;

      // by default go with the consumer (learner) mode
      case MODES.STUDENT:
      case MODES.CONSUMER:
      case MODES.LEARNER:
      default:
        return <StudentView />;
    }
  }
} */

/* const mapStateToProps = ({ context, appInstance }) => ({
  lang: context.lang,
  mode: context.mode,
  appInstanceId: context.appInstanceId,
  ready: appInstance.ready,
  standalone: context.standalone,
}); */

/* const mapDispatchToProps = {
  dispatchGetContext: getContext,
  dispatchGetAppInstance: getAppInstance,
}; */

/* const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App); */

/* export default withTranslation()(ConnectedApp); */
