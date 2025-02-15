import IPreFilterAgreement, {
  IEditAgreementParams,
  ISaveAgreementParams,
} from "../entities/IPreFilterAgreement";
import { TypeOfAgreement } from "../entities/TypeOfAgreement";

export interface IAgreementGateway {
  getAgreements: () => Promise<IPreFilterAgreement[]>;
  editAgreement: (params: IEditAgreementParams) => Promise<IPreFilterAgreement>;
  saveAgreement: (params: ISaveAgreementParams) => Promise<IPreFilterAgreement>;
  deleteAgreement: (id: string) => Promise<IPreFilterAgreement>;
  getTypeOfAgreements: () => Promise<TypeOfAgreement[] | undefined>;
  editTypeOfAgreement: (body: string, id: string) => Promise<TypeOfAgreement>;
}
