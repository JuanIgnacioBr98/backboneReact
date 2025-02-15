import { ITypeOfAgreement } from "../entities/ITypeOfAgreement";
import { IEditTypeOfAgreementParams } from "../entities/ITypeOfAgreement";
import { ISaveTypeOfAgreementParams } from "../entities/ITypeOfAgreement";

export interface ITypeOfAgreementGateway {
  getTypeOfAgreements: () => Promise<ITypeOfAgreement[] | undefined>;
  editTypeOfAgreement: (body: Partial<IEditTypeOfAgreementParams>, id: string) => Promise<ITypeOfAgreement>;
  saveTypeOfAgreement: (body: ISaveTypeOfAgreementParams) => Promise<ITypeOfAgreement>;
  deleteTypeOfAgreement: (id: string) => Promise<ITypeOfAgreement>;
}
