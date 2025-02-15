import IPreFilterAgreement from "../entities/IPreFilterAgreement";
import { IAgreementGateway } from "../gateways/IAgreementsGateway";

export interface ISaveAgreementAction {
  execute: (body: Partial<IPreFilterAgreement>) => Promise<IPreFilterAgreement>;
}

export const SaveAgreementAction = (agreementsGateway: IAgreementGateway): ISaveAgreementAction => {
  return {
    async execute(body) {
      try {
        const result = await agreementsGateway.saveAgreement({body});
        return Promise.resolve(result);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
