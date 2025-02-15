export default interface IPreFilterPipe {
  order: number;
  key: string;
  value: string;
  id: string;
}

export interface IEditPipeParams {
  body: {
    key?: string;
    value?: string;
  };
  id: string;
}

export interface ISavePipeParams {
  body: {
    order?: number;
    key?: string;
    value?: string;
  };
}
