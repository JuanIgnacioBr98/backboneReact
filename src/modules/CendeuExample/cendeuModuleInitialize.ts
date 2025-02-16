import { DependencyManager } from "../../dependencyManager";
import { IHttpClient } from "../httpClient/interfaces";
import { DownloadFileByNameAction } from "./core/actions/DownloadFileByNameAction";
import { GetRegistersAction } from "./core/actions/GetRegistersAction";
import { ProcessFileAction } from "./core/actions/ProcessFileAction";
import { DownloadErrorFileAction } from "./core/actions/DownloadErrorFileAction";
import { CendeuGateway } from "./infrastructure/gateways/CendeuGateway";

export const cendeuModuleInitialize = (
  dependencyManager: DependencyManager
) => {
  const cendeuGateway = CendeuGateway(
    GetHttpClientDependency(dependencyManager)
  );
  const processFileAction = ProcessFileAction(cendeuGateway);
  const getRegistersAction = GetRegistersAction(cendeuGateway);
  const downloadFileByNameAction = DownloadFileByNameAction(cendeuGateway);

  const downloadErrorFileAction = DownloadErrorFileAction(cendeuGateway);

  dependencyManager.register("cendeuProcessFileAction", processFileAction);
  dependencyManager.register("cendeuGetRegistersAction", getRegistersAction);
  dependencyManager.register(
    "cendeuDownloadFileByNameAction",
    downloadFileByNameAction
  );
  dependencyManager.register(
    "cendeuDownloadErrorFileAction",
    downloadErrorFileAction
  );
};

export const GetHttpClientDependency = (dependencyManager: DependencyManager) =>
  dependencyManager.resolve("httpClient") as IHttpClient;
