import IPreFilterPipe, { IEditPipeParams, ISavePipeParams } from "../entities/IPreFilterPipe";

export interface IPipesGateway {
  getPipes: () => Promise<IPreFilterPipe[]>;
  editPipe: (params: IEditPipeParams) => Promise<IPreFilterPipe>;
  savePipe: (params: ISavePipeParams) => Promise<IPreFilterPipe>;
  deletePipe: (id: string) => Promise<IPreFilterPipe>;
}
