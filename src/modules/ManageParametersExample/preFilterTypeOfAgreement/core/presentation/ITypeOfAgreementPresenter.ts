import { IEditTypeOfAgreementParams, ITypeOfAgreement } from "../entities/ITypeOfAgreement";
import { ISaveTypeOfAgreementParams } from "../entities/ITypeOfAgreement";
export interface ITypeOfAgreementPresenter {
  getTypeOfAgreements: () => Promise<void>;
  saveTypeOfAgreement: (ISaveTypeOfAgreementParams) => Promise<void>;
  deleteTypeOfAgreement: (id: string) => Promise<void>;
  editTypeOfAgreement: (
    Ibody: Partial<ITypeOfAgreement>,
    id: string
  ) => Promise<void>;
}
