import { ITypeOfAgreement } from "../entities/ITypeOfAgreement";
import { ITypeOfAgreementGateway } from "../gateways/ITypeOfAgreementGateway";

export interface IDeleteTypeOfAgreementAction {
  execute: (id: string) => Promise<ITypeOfAgreement>;
}

export const DeleteTypeOfAgreementAction = (typeOfAgreementGateway: ITypeOfAgreementGateway): IDeleteTypeOfAgreementAction => {
  return {
    async execute(id) {
      try {
        const result = await typeOfAgreementGateway.deleteTypeOfAgreement(id);
        return Promise.resolve(result);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
