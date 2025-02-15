import { IAgesGateway } from "../gateways/IAgesGateway";

export interface IGetAgesAction {
  execute: () => Promise<any>;
}

export const GetAgesAction = (
  agesGateway: IAgesGateway
): IGetAgesAction => {
  return {
    async execute() {
      try {
        const result = await agesGateway.getAges();        
        return Promise.resolve(result);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
