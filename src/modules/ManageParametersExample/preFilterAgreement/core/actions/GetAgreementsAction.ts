import IPreFilterAgreement from "../entities/IPreFilterAgreement";
import { IAgreementGateway } from "../gateways/IAgreementsGateway";

export interface IGetAgreementsAction {
  execute: () => Promise<IPreFilterAgreement[]>;
}

export const GetAgreementsAction = (
  agreementsGateway: IAgreementGateway
): IGetAgreementsAction => {
  return {
    async execute() {
      try {
        const result = await agreementsGateway.getAgreements();        
        return Promise.resolve(result);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
