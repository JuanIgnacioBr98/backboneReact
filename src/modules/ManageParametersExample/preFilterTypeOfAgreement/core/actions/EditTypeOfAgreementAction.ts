import { ITypeOfAgreement } from "../entities/ITypeOfAgreement";
import { ITypeOfAgreementGateway } from "../gateways/ITypeOfAgreementGateway";

export interface IEditTypeOfAgreementAction {
  execute: (body: Partial<ITypeOfAgreement>, id: string) => Promise<ITypeOfAgreement>;
}

export const EditTypeOfAgreementAction = (typeOfAgreementGateway: ITypeOfAgreementGateway): IEditTypeOfAgreementAction => {
  return {
    async execute(body,id) {
      try {
        const result = await typeOfAgreementGateway.editTypeOfAgreement(body, id);
        return Promise.resolve(result);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
