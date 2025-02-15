import { DependencyManager } from "../../dependencyManager";
import { IHttpClient } from "../httpClient/interfaces";
import { DownloadFileByNameAction } from "./core/actions/DownloadFileByNameAction";
import { GetRegistersAction } from "./core/actions/GetRegistersAction";
import { ProcessFileAction } from "./core/actions/ProcessFileAction";
import { UpdateFileStatusAction } from "./core/actions/UpdateFileStatusAction";
import { DownloadErrorFileAction } from "./core/actions/DownloadErrorFileAction";
import { CendeuGateway } from "./infrastructure/gateways/CendeuGateway";
import { HttpUpdateFileStatusGateway } from "./infrastructure/gateways/HttpUpdateFileStatusGateway";

export const cendeuModuleInitialize = (
  dependencyManager: DependencyManager
) => {
  const cendeuGateway = CendeuGateway(
    GetHttpClientDependency(dependencyManager)
  );
  const processFileAction = ProcessFileAction(cendeuGateway);
  const getRegistersAction = GetRegistersAction(cendeuGateway);
  const downloadFileByNameAction = DownloadFileByNameAction(cendeuGateway);
  const updateFileStatusGateway = HttpUpdateFileStatusGateway(
    GetHttpClientDependency(dependencyManager)
  );
  const updateFileStatusAction = UpdateFileStatusAction(
    updateFileStatusGateway
  );
  const downloadErrorFileAction = DownloadErrorFileAction(cendeuGateway);

  dependencyManager.register("cendeuProcessFileAction", processFileAction);
  dependencyManager.register("cendeuGetRegistersAction", getRegistersAction);
  dependencyManager.register(
    "cendeuDownloadFileByNameAction",
    downloadFileByNameAction
  );
  dependencyManager.register(
    "updateFileStatusActionCendeu",
    updateFileStatusAction
  );
  dependencyManager.register(
    "cendeuDownloadErrorFileAction",
    downloadErrorFileAction
  );
};

export const GetHttpClientDependency = (dependencyManager: DependencyManager) =>
  dependencyManager.resolve("httpClient") as IHttpClient;
