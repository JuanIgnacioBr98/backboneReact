import { useState } from "react";

export { useState };

export { DependencyManager } from "./dependencyManager";
export { multiLanguageModuleInitialize } from "./modules/multiLanguage/multiLanguageModule";
export { DependenciesContextProvider } from "./contexts/Dependencies";
export { loginModuleInitialize } from "./modules/Login/loginModuleInitialize";
export { httpClientModuleInitialize } from "./modules/httpClient/httpClientModule";
export { manageParametersModuleInitialize } from "./modules/ManageParameters/manageParametersModuleInitialize";
export { leadsModuleInitialize } from "./modules/Leads/leadsModuleInitialize";
export { rucModuleInitialize } from "./modules/Ruc/rucModuleInitialize"; 
export { cendeuModuleInitialize } from "./modules/Cendeu/cendeuModuleInitialize";

import Layout from "./components/Layout";

export { Layout };
