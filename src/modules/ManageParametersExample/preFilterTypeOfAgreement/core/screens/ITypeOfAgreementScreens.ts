import { ITypeOfAgreement } from "../entities/ITypeOfAgreement";

export interface ITypeOfAgreementScreens {
  onGetTypeOfAgreementSuccess: (value: ITypeOfAgreement[] | undefined) => void;
  onGetTypeOfAgreementError: (error: string) => void;

  onEditTypeOfAgreementSuccess: (value : ITypeOfAgreement) => void;
  onEditTypeOfAgreementError: (error: string) => void;

  onSaveTypeOfAgreementSuccess: (value : ITypeOfAgreement) => void;
  onSaveTypeOfAgreementError: (error: string) => void;

  onDeleteTypeOfAgreementSuccess: (value : ITypeOfAgreement) => void;
  onDeleteTypeOfAgreementError: (error: string) => void;
}
