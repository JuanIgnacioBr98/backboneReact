import { ITypeOfAgreement } from "../entities/ITypeOfAgreement";
import { ITypeOfAgreementGateway } from "../gateways/ITypeOfAgreementGateway";
export interface ISaveTypeOfAgreementAction {
  execute: (body: Partial<ITypeOfAgreement>) => Promise<ITypeOfAgreement>;
}

export const SaveTypeOfAgreementAction = (typeOfAgreementGateway: ITypeOfAgreementGateway): ISaveTypeOfAgreementAction => {
  return {
    async execute(body) {
      try {
        const result = await typeOfAgreementGateway.saveTypeOfAgreement(body);
        return Promise.resolve(result);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
