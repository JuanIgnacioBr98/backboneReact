import { IDeleteAgreementAction } from "../../core/actions/DeleteAgreementAction";
import { IEditAgreementAction } from "../../core/actions/EditAgreementAction";
import { IGetAgreementsAction } from "../../core/actions/GetAgreementsAction";
import { IGetTypeOfAgreementsAction } from "../../core/actions/GetTypeOfAgreementsAction";
import { ISaveAgreementAction } from "../../core/actions/SaveAgreementAction";
import { IAgreementsPresenter } from "../../core/presentation/IAgreementsPresenter";
import { IAgreementsScreens } from "../../core/screens/IAgreementsScreens";

export const AgreementsPresenter = (
  getAgreements: IGetAgreementsAction,
  editAgreement: IEditAgreementAction,
  saveAgreement: ISaveAgreementAction,
  deleteAgreement: IDeleteAgreementAction,
  getTypeOfAgreements: IGetTypeOfAgreementsAction,
  agreementsScreen: IAgreementsScreens
): IAgreementsPresenter => {
  return {
    async getAgreements() {
      try {
        const res = await getAgreements.execute();
        agreementsScreen.onGetAgreementsSuccess(res);
      } catch (error) {
        agreementsScreen.onGetAgreementsError(error);
      }
    },

    async editAgreement(body: object, id: string) {
      try {
        const res = await editAgreement.execute(body, id);        
        agreementsScreen.onEditAgreementSuccess(res);
      } catch (error) {        
        agreementsScreen.onEditAgreementError(error);
      }
    },

    async saveAgreement(body: object) {
      try {
        const res = await saveAgreement.execute(body);
        agreementsScreen.onSaveAgreementSuccess(res);
      } catch (error) {        
        agreementsScreen.onSaveAgreementError(error);
      }
    },

    async deleteAgreement(id: string) {
      try {
        const res = await deleteAgreement.execute(id);
        agreementsScreen.onDeleteAgreementSuccess(res);
      } catch (error) {
        agreementsScreen.onDeleteAgreementError(error);
      }
    },

    async getTypeOfAgreements() {
      try {
        const res = await getTypeOfAgreements.execute();
        agreementsScreen.onGetTypeOfAgreementsSuccess(res);
      } catch (error) {
        agreementsScreen.onGetTypeOfAgreementsError(error);
      }
    },
  };
};
