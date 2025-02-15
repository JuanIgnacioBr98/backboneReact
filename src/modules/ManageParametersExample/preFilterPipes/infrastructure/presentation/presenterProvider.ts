/* eslint-disable react-hooks/rules-of-hooks */

import { IPresenterProvider } from "../../../../../utils/iPresenterProvider";
import { IPipesPresenter } from "../../core/presentation/IPipesPresenter";
import { IPipesScreens } from "../../core/screens/IPipesScreens";
import { useDependency } from "../../../../../hooks/useDependency";
import { IGetPipesAction } from "../../core/actions/GetPipesAction";
import { PipesPresenter } from "./PipesPresenter";
import { IEditPipeAction } from "../../core/actions/EditPipeAction";
import { ISavePipeAction } from "../../core/actions/SavePipeAction";
import { IDeletePipeAction } from "../../core/actions/DeletePipeAction";

export const pipesPresenterProvider = (): IPresenterProvider<
  IPipesScreens,
  IPipesPresenter
> => {
  const getPipesAction = useDependency("getPipesAction") as IGetPipesAction;
  const editPipeAction = useDependency("editPipeAction") as IEditPipeAction;
  const savePipeAction = useDependency("savePipeAction") as ISavePipeAction;
  const deletePipeAction = useDependency(
    "deletePipeAction"
  ) as IDeletePipeAction;

  return {
    getPresenter(viewHandlers) {
      const presenter = PipesPresenter(
        getPipesAction,
        editPipeAction,
        savePipeAction,
        deletePipeAction,
        viewHandlers
      );
      return presenter;
    },
  };
};
