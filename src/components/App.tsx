import { FC, useEffect } from 'react';

import { useLocalContext } from '@graasp/apps-query-client';
import { PermissionLevel } from '@graasp/sdk';

import { DEFAULT_CONTEXT_LANGUAGE } from '../config/appSettings';
import i18n from '../config/i18n';
import { DEFAULT_PERMISSION } from '../config/settings';
import '../index.css';
import { AppActionProvider } from './context/AppActionContext';
import { AppDataProvider } from './context/AppDataContext';
import { AppSettingProvider } from './context/AppSettingContext';
import { CanvasProvider } from './context/CanvasContext';
import { MembersProvider } from './context/MembersContext';
import StudentView from './modes/student/StudentView';
import TeacherView from './modes/teacher/TeacherView';

const App: FC = () => {
  // context describes the item context, i.e. has the item id, current member id (memberId),
  // the language and current view (builder, player, ...), the current permission (admin, write, read)
  const context = useLocalContext();

  const permissionLevel: PermissionLevel =
    context?.permission || DEFAULT_PERMISSION;

  useEffect(() => {
    // handle a change of language
    const lang = context?.lang ?? DEFAULT_CONTEXT_LANGUAGE;
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [context]);

  const renderContent = (): JSX.Element => {
    switch (permissionLevel) {
      // show teacher view when in producer (educator) mode
      case PermissionLevel.Write:
      case PermissionLevel.Admin:
        return <TeacherView />;

      // by default go with the consumer (learner) mode
      case PermissionLevel.Read:
      default:
        return <StudentView />;
    }
  };

  return (
    <MembersProvider>
      <AppDataProvider>
        <AppSettingProvider>
          <AppActionProvider>
            <CanvasProvider>{renderContent()}</CanvasProvider>
          </AppActionProvider>
        </AppSettingProvider>
      </AppDataProvider>
    </MembersProvider>
  );
};

export default App;
