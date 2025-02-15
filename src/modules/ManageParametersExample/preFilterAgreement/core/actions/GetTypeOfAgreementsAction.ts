import { TypeOfAgreement } from "../entities/TypeOfAgreement";
import { IAgreementGateway } from "../gateways/IAgreementsGateway";

export interface IGetTypeOfAgreementsAction {
  execute: () => Promise<TypeOfAgreement[] | undefined>;
}

export const GetTypeOfAgreementsAction = (
  agreementsGateway: IAgreementGateway
): IGetTypeOfAgreementsAction => {
  return {
    async execute() {
      try {
        const result = await agreementsGateway.getTypeOfAgreements();
        return Promise.resolve(result);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
