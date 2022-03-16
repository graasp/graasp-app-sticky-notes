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

export  const mockContext ={permission: "write", context:"builder"}
  
export default buildDatabase;