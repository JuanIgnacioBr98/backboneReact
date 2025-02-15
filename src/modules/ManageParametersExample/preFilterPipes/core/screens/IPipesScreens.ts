import IPreFilterPipe from "../entities/IPreFilterPipe";

export interface IPipesScreens {
  onGetPipesSuccess: (value: IPreFilterPipe[]) => void;
  onGetPipesError: (error: string) => void;

  onEditPipeSuccess: (value: IPreFilterPipe) => void;
  onEditPipeError: (error: string) => void;

  onSavePipeSuccess: (value: IPreFilterPipe) => void;
  onSavePipeError: (error: string) => void;

  onDeletePipeSuccess: (value: IPreFilterPipe) => void;
  onDeletePipeError: (error: string) => void;
}
