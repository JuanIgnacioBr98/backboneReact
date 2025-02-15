import IPreFilterAgreement from "../entities/IPreFilterAgreement";
import { IAgreementGateway } from "../gateways/IAgreementsGateway";

export interface IEditAgreementAction {
  execute: (body: Partial<IPreFilterAgreement>, id: string) => Promise<IPreFilterAgreement>;
}

export const EditAgreementAction = (agreementsGateway: IAgreementGateway): IEditAgreementAction => {
  return {
    async execute(body,id) {
      try {
        const result = await agreementsGateway.editAgreement({body, id });
        return Promise.resolve(result);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
