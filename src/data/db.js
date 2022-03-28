import { CONTEXTS } from "../config/contexts";
import { PERMISSION_LEVELS } from "../config/settings";

const buildDatabase = (appContext) => ({
    appData: [],
    appActions: [],
    members: [
      {
        id: appContext.memberId,
        name: 'mock-member',
      },
    ],
  });

export  const mockContext ={permission: PERMISSION_LEVELS.WRITE, context:CONTEXTS.BUILDER}
  
export default buildDatabase;