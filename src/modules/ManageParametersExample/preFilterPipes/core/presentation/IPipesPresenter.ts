import IPreFilterPipe from "../entities/IPreFilterPipe";

export interface IPipesPresenter {
  getPipes: () => Promise<void>;
  editPipe: (body: Partial<IPreFilterPipe>, id: string) => Promise<void>;
  savePipe: (body: Partial<IPreFilterPipe>) => Promise<void>;
  deletePipe: (id: string) => Promise<void>;
}
