import IPreFilterAgreement from "../entities/IPreFilterAgreement";
import { IAgreementGateway } from "../gateways/IAgreementsGateway";

export interface IDeleteAgreementAction {
  execute: (id: string) => Promise<IPreFilterAgreement>;
}

export const DeleteAgreementAction = (agreementsGateway: IAgreementGateway): IDeleteAgreementAction => {
  return {
    async execute(id) {
      try {
        const result = await agreementsGateway.deleteAgreement(id);
        return Promise.resolve(result);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
