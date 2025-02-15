import React, { useEffect } from "react";
import { MantineProvider } from "@mantine/core";
import { customTheme } from "./themes";
import Router from "./routes/router";
import * as app from "./app.imports";
import { Notifications } from "@mantine/notifications";

const App = () => {
  const [isLoaded, setIsLoaded] = app.useState<boolean>(false);
  const [dependencyManager] = app.useState<app.DependencyManager>(
    new app.DependencyManager()
  );

  useEffect(() => {
    app.multiLanguageModuleInitialize();
    app.httpClientModuleInitialize(dependencyManager);
    app.loginModuleInitialize(dependencyManager);
    app.manageParametersModuleInitialize(dependencyManager);
    app.leadsModuleInitialize(dependencyManager);
    app.rucModuleInitialize(dependencyManager);
    app.cendeuModuleInitialize(dependencyManager);
    setIsLoaded(true);
  }, []);

  return (
    <MantineProvider theme={customTheme}>
      <Notifications />
      {isLoaded && (
        <app.DependenciesContextProvider dependencyManager={dependencyManager}>
          <Router />
        </app.DependenciesContextProvider>
      )}
    </MantineProvider>
  );
};

export default App;
