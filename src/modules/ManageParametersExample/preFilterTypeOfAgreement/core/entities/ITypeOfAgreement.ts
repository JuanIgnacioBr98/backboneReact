export type ITypeOfAgreement = {
  id: string;
  typeOfEmployer: string;
  decision: string;
};

export interface IEditTypeOfAgreementParams {
  body: {
    typeOfEmployer?: string;
    decision?: string;
  };
  id: string;
}

export interface ISaveTypeOfAgreementParams {
  body: {
    typeOfEmployer?: string;
    decision?: string;
  };
}
