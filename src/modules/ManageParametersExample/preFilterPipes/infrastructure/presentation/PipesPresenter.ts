import { IDeletePipeAction } from "../../core/actions/DeletePipeAction";
import { IEditPipeAction } from "../../core/actions/EditPipeAction";
import { IGetPipesAction } from "../../core/actions/GetPipesAction";
import { ISavePipeAction } from "../../core/actions/SavePipeAction";
import { IPipesPresenter } from "../../core/presentation/IPipesPresenter";
import { IPipesScreens } from "../../core/screens/IPipesScreens";

export const PipesPresenter = (
  getPipes: IGetPipesAction,
  editPipe: IEditPipeAction,
  savePipe: ISavePipeAction,
  deletePipe: IDeletePipeAction,
  pipesScreen: IPipesScreens
): IPipesPresenter => {
  return {
    async getPipes() {
      try {
        const res = await getPipes.execute();
        pipesScreen.onGetPipesSuccess(res);
      } catch (error) {
        pipesScreen.onGetPipesError(error);
      }
    },

    async editPipe(body: object, id: string) {
      try {
        const res = await editPipe.execute(body, id);
        pipesScreen.onEditPipeSuccess(res);
      } catch (error) {
        pipesScreen.onEditPipeError(error);
      }
    },

    async savePipe(body: object) {
      try {
        const res = await savePipe.execute(body);
        pipesScreen.onSavePipeSuccess(res);
      } catch (error) {
        pipesScreen.onSavePipeError(error);
      }
    },

    async deletePipe(id: string) {
      try {
        const res = await deletePipe.execute(id);
        pipesScreen.onDeletePipeSuccess(res);
      } catch (error) {
        pipesScreen.onDeletePipeError(error);
      }
    },
  };
};
