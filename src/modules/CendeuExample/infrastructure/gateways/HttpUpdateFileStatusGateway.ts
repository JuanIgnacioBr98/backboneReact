import { IHttpClient } from "../../../httpClient/interfaces";
import { IUpdateFileStatusGateway } from "../../core/gateways/IUpdateFileStatusGateway";
import { apis } from "../../../../constants/api";
import { FileType } from "../../../Leads/core/entities/FileTypeEnum";

export const HttpUpdateFileStatusGateway = (
  httpClient: IHttpClient
): IUpdateFileStatusGateway => {
  return {
    async updateStatus(fileName, status) {
      try {
        const response = await httpClient.patch(apis.fileLogs.fileLogs, {
          fileName,
          status,
          type: FileType.CENDEU,
        });
        if (!response.status) {
          return Promise.reject(false);
        }
        return Promise.resolve(true);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
