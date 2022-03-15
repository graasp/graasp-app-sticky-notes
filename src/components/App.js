import React, { useContext } from 'react';
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
    if (context?.get('context') === CONTEXTS.ANALYZER) {
      return <AnalyzerView />;
    }

    switch (context?.get('permission', DEFAULT_PERMISSION)) {
      // show teacher view when in producer (educator) mode
      case PERMISSION_LEVELS.WRITE:
      case PERMISSION_LEVELS.ADMIN:
        // case permission:
        return <TeacherView />;

      // by default go with the consumer (learner) mode
      case PERMISSION_LEVELS.READ:
      default:
        return <StudentView />;
    }
  };

  return (
    <TokenProvider>
      <CanvasProvider>{renderContent()}</CanvasProvider>
    </TokenProvider>
  );
};

export default App;
