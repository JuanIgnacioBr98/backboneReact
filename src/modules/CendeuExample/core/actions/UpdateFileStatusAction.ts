import { IUpdateFileStatusGateway } from "../gateways/IUpdateFileStatusGateway";

export interface IUpdateFileStatusAction {
  execute: (fileName: string, status: boolean) => Promise<boolean>;
}

export const UpdateFileStatusAction = (
  updateFileStatusGateway: IUpdateFileStatusGateway
): IUpdateFileStatusAction => {
  return {
    async execute(fileName, status) {
      try {
        const response = await updateFileStatusGateway.updateStatus(
          fileName,
          status
        );
        return Promise.resolve(response);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
