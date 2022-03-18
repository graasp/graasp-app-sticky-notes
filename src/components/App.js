import React, { useContext } from 'react';
import TeacherView from './modes/teacher/TeacherView';
import StudentView from './modes/student/StudentView';
import { Context } from './context/ContextContext';
import { TokenProvider } from './context/TokenContext';
import { DEFAULT_PERMISSION } from '../config/settings';

export const App = () => {
  const context = useContext(Context);

  const renderContent = () => {
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