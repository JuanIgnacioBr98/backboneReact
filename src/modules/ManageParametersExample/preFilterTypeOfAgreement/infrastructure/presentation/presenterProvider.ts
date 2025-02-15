/* eslint-disable react-hooks/rules-of-hooks */

import { IPresenterProvider } from "../../../../../utils/iPresenterProvider";
import { useDependency } from "../../../../../hooks/useDependency";
import { IGetTypeOfAgreementsAction } from "../../core/actions/GetTypeOfAgreementsAction";
import { ITypeOfAgreementScreens } from "../../core/screens/ITypeOfAgreementScreens";
import { ITypeOfAgreementPresenter } from "../../core/presentation/ITypeOfAgreementPresenter";
import { TypeOfAgreementPresenter } from "./TypeOfAgreementPresenter";
import { IEditTypeOfAgreementAction } from "../../core/actions/EditTypeOfAgreementAction";
import { IDeleteTypeOfAgreementAction } from "../../core/actions/DeleteTypeOfAgreementAction";
import { ISaveTypeOfAgreementAction } from "../../core/actions/SaveTypeOfAgreementAction";

export const TypeOfAgreementPresenterProvider = (): IPresenterProvider<
  ITypeOfAgreementScreens,
  ITypeOfAgreementPresenter
> => {
  const getTypeOfAgreementsAction = useDependency(
    "getTypeOfAgreementsAction"
  ) as IGetTypeOfAgreementsAction;
  const editTypeOfAgreementAction = useDependency(
    "editTypeOfAgreementAction"
  ) as IEditTypeOfAgreementAction;
  const deleteTypeOfAgreementAction = useDependency(
    "deleteTypeOfAgreementAction"
  ) as IDeleteTypeOfAgreementAction;
  const saveTypeOfAgreementAction = useDependency(
    "saveTypeOfAgreementAction"
  ) as ISaveTypeOfAgreementAction;


  return {
    getPresenter(viewHandlers) {
      const presenter = TypeOfAgreementPresenter(
        getTypeOfAgreementsAction,
        viewHandlers,
        editTypeOfAgreementAction,
        saveTypeOfAgreementAction,
        deleteTypeOfAgreementAction,
      );
      return presenter;
    },
  };
};
