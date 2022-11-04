import React, { useContext } from 'react';

import { Context } from '@graasp/apps-query-client';

import { DEFAULT_PERMISSION, PERMISSION_LEVELS } from '../config/settings';
import { CanvasProvider } from './context/CanvasContext';
import StudentView from './modes/student/StudentView';
import TeacherView from './modes/teacher/TeacherView';

export const App = () => {
  const context = useContext(Context);

  const renderContent = () => {
    switch (context?.get('permission', DEFAULT_PERMISSION)) {
      // show teacher view when in producer (educator) mode
      case PERMISSION_LEVELS.WRITE:
      case PERMISSION_LEVELS.ADMIN:
        return <TeacherView />;

      // by default go with the consumer (learner) mode
      case PERMISSION_LEVELS.READ:
      default:
        return <StudentView />;
    }
  };

  return <CanvasProvider>{renderContent()}</CanvasProvider>;
};

export default App;
