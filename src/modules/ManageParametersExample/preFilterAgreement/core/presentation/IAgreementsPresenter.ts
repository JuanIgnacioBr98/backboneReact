import IPreFilterAgreement from "../entities/IPreFilterAgreement";

export interface IAgreementsPresenter {
  getAgreements: () => Promise<void>;
  editAgreement: (
    body: Partial<IPreFilterAgreement>,
    id: string
  ) => Promise<void>;
  saveAgreement: (body: Partial<IPreFilterAgreement>) => Promise<void>;
  deleteAgreement: (id: string) => Promise<void>;
  getTypeOfAgreements: () => Promise<void>;
}
