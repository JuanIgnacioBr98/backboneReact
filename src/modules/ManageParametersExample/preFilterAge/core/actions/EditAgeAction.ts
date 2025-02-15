import IPreFilterAge from "../entities/IPreFilterAge";
import { IAgesGateway } from "../gateways/IAgesGateway";

export interface IEditAgeAction {
  execute: (body: Partial<IPreFilterAge>, id: string) => Promise<any>;
}

export const EditAgeAction = (agesGateway: IAgesGateway): IEditAgeAction => {
  return {
    async execute(body,id) {
      try {
        const result = await agesGateway.editAge({body, id });
        return Promise.resolve(result);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
