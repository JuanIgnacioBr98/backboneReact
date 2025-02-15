import { IEditAgeAction } from "../../core/actions/EditAgeAction";
import { IGetAgesAction } from "../../core/actions/GetAgesAction";
import { IAgesPresenter } from "../../core/presentation/IAgesPresenter";
import { IAgesScreens } from "../../core/screens/IAgesScreens";

export const AgesPresenter = (
  getAges: IGetAgesAction,
  editAge: IEditAgeAction,
  agesScreen: IAgesScreens
): IAgesPresenter => {
  return {
    async getAges() {
      try {
        const res = await getAges.execute();
        agesScreen.onGetAgesSuccess(res);
      } catch (error) {
        agesScreen.onGetAgesError(error);
      }
    },

    async editAge(body: object, id: string) {
      try {
        await editAge.execute(body, id);
      } catch (error) {
        agesScreen.onEditAgeError(error);
      }
    },
  };
};
