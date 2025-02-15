import { ProcessFileResponse } from "../entities/ProcessFileResponse";
import { ICendeuGateway } from "../gateways/ICendeuGateway";

export interface IProcessFileAction {
  execute: (file: File, period: string) => Promise<ProcessFileResponse>;
}

export const ProcessFileAction = (
  cendeuGateway: ICendeuGateway
): IProcessFileAction => {
  return {
    async execute(file, period) {
      try {
        const response = await cendeuGateway.processFile(file, period);
        return Promise.resolve(response);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
