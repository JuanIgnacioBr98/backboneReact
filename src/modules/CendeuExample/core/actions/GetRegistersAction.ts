import { GetRegistersParams } from "../../../Leads/core/entities/GetRegistersParams";
import { IResponsePaginatedRegister } from "../../../Leads/core/entities/IResponsePaginatedRegisters";
import { ICendeuGateway } from "../gateways/ICendeuGateway";

export interface IGetRegistersAction {
  execute: (params: GetRegistersParams) => Promise<IResponsePaginatedRegister>;
}

export const GetRegistersAction = (cendeuGateway: ICendeuGateway): IGetRegistersAction => {
  return {
    async execute(params) {
      try {
        const registers = await cendeuGateway.getRegisters(params);
        return Promise.resolve(registers);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
