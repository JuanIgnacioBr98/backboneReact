import { ITypeOfAgreement } from "../entities/ITypeOfAgreement";
import { ITypeOfAgreementGateway } from "../gateways/ITypeOfAgreementGateway";

export interface IGetTypeOfAgreementsAction {
  execute: () => Promise<ITypeOfAgreement[] | undefined>;
}

export const GetTypeOfAgreementsAction = (
  typeOfAgreementsGateway: ITypeOfAgreementGateway
): IGetTypeOfAgreementsAction => {
  return {
    async execute() {
      try {
        const result = await typeOfAgreementsGateway.getTypeOfAgreements();
        return Promise.resolve(result);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
