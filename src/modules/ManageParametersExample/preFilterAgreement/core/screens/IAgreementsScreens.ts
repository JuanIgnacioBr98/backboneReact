import IPreFilterAgreement from "../entities/IPreFilterAgreement";
import { TypeOfAgreement } from "../entities/TypeOfAgreement";

export interface IAgreementsScreens {
  onGetAgreementsSuccess: (value: IPreFilterAgreement[]) => void;
  onGetAgreementsError: (error: string) => void;

  onEditAgreementSuccess: (value: IPreFilterAgreement) => void;
  onEditAgreementError: (error: string) => void;

  onSaveAgreementSuccess: (value: IPreFilterAgreement) => void;
  onSaveAgreementError: (error: string) => void;

  onDeleteAgreementSuccess: (value: IPreFilterAgreement) => void;
  onDeleteAgreementError: (error: string) => void;

  onGetTypeOfAgreementsSuccess: (value: TypeOfAgreement[] | undefined) => void;
  onGetTypeOfAgreementsError: (error: string) => void;
}
