export default interface IPreFilterAgreement {
  id: string;
  number: number;
  name: string;
  typeId: number;
}

export interface IEditAgreementParams {
  body: {
    number?: number;
    name?: string;
    typeId?: number;
  };
  id: string;
}

export interface ISaveAgreementParams {
  body: {
    number?: number;
    name?: string;
    typeId?: number;
  };
}
