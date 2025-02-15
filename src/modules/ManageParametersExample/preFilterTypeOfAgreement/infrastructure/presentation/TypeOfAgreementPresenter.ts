import { IGetTypeOfAgreementsAction } from "../../core/actions/GetTypeOfAgreementsAction";
import { IEditTypeOfAgreementAction } from "../../core/actions/EditTypeOfAgreementAction";
import { ISaveTypeOfAgreementAction } from "../../core/actions/SaveTypeOfAgreementAction";
import { IDeleteTypeOfAgreementAction } from "../../core/actions/DeleteTypeOfAgreementAction";
import { ITypeOfAgreementScreens } from "../../core/screens/ITypeOfAgreementScreens";
import { ITypeOfAgreementPresenter } from "../../core/presentation/ITypeOfAgreementPresenter";

export const TypeOfAgreementPresenter = (
  getTypeOfAgreements: IGetTypeOfAgreementsAction,
  typeOfAgreementsScreen: ITypeOfAgreementScreens,
  editTypeOfAgreement: IEditTypeOfAgreementAction,
  saveTypeOfAgreement: ISaveTypeOfAgreementAction,
  deleteTypeOfAgreement: IDeleteTypeOfAgreementAction
): ITypeOfAgreementPresenter => {
  return {
    async getTypeOfAgreements() {
      try {
        const res = await getTypeOfAgreements.execute();
        typeOfAgreementsScreen.onGetTypeOfAgreementSuccess(res);
      } catch (error) {
        typeOfAgreementsScreen.onGetTypeOfAgreementError(error);
      }
    },
    async editTypeOfAgreement(body: object, id: string) {
      try {
        const res = await editTypeOfAgreement.execute(body, id);
        typeOfAgreementsScreen.onEditTypeOfAgreementSuccess(res);
      } catch (error) {
        typeOfAgreementsScreen.onEditTypeOfAgreementError(error);
      }
    },

    async saveTypeOfAgreement(params) {
      try {
        const res = await saveTypeOfAgreement.execute(params);
        typeOfAgreementsScreen.onSaveTypeOfAgreementSuccess(res);
      } catch (error) {
        typeOfAgreementsScreen.onSaveTypeOfAgreementError(error);
      }
    },

    async deleteTypeOfAgreement(id) {
      try {
        const res = await deleteTypeOfAgreement.execute(id);
        typeOfAgreementsScreen.onDeleteTypeOfAgreementSuccess(res);
      } catch (error) {
        typeOfAgreementsScreen.onDeleteTypeOfAgreementError(error);
      }
    },
  };
};
