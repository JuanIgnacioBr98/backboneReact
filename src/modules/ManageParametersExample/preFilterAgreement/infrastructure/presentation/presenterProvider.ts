/* eslint-disable react-hooks/rules-of-hooks */

import { IPresenterProvider } from "../../../../../utils/iPresenterProvider";
import { useDependency } from "../../../../../hooks/useDependency";
import { IAgreementsScreens } from "../../core/screens/IAgreementsScreens";
import { IAgreementsPresenter } from "../../core/presentation/IAgreementsPresenter";
import { IGetAgreementsAction } from "../../core/actions/GetAgreementsAction";
import { IEditAgreementAction } from "../../core/actions/EditAgreementAction";
import { AgreementsPresenter } from "./AgreementsPresenter";
import { ISaveAgreementAction } from "../../core/actions/SaveAgreementAction";
import { IDeleteAgreementAction } from "../../core/actions/DeleteAgreementAction";
import { IGetTypeOfAgreementsAction } from "../../core/actions/GetTypeOfAgreementsAction";

export const agreementsPresenterProvider = (): IPresenterProvider<
  IAgreementsScreens,
  IAgreementsPresenter
> => {
  const getAgreementsAction = useDependency(
    "getAgreementsAction"
  ) as IGetAgreementsAction;
  const editAgreementAction = useDependency(
    "editAgreementAction"
  ) as IEditAgreementAction;
  const saveAgreementAction = useDependency(
    "saveAgreementAction"
  ) as ISaveAgreementAction;
  const deleteAgreementAction = useDependency(
    "deleteAgreementAction"
  ) as IDeleteAgreementAction;
  const getTypeOfAgreementsAction = useDependency(
    "getTypeOfAgreementsAction"
  ) as IGetTypeOfAgreementsAction;


  return {
    getPresenter(viewHandlers) {
      const presenter = AgreementsPresenter(
        getAgreementsAction,
        editAgreementAction,
        saveAgreementAction,
        deleteAgreementAction,
        getTypeOfAgreementsAction,
        viewHandlers
      );
      return presenter;
    },
  };
};
