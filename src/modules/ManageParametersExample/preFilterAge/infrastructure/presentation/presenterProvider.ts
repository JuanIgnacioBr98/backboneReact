/* eslint-disable react-hooks/rules-of-hooks */

import { IPresenterProvider } from '../../../../../utils/iPresenterProvider';
import { useDependency } from '../../../../../hooks/useDependency';
import { IAgesScreens } from '../../core/screens/IAgesScreens';
import { IAgesPresenter } from '../../core/presentation/IAgesPresenter';
import { IGetAgesAction } from '../../core/actions/GetAgesAction';
import { IEditAgeAction } from '../../core/actions/EditAgeAction';
import { AgesPresenter } from './AgesPresenter';


export const agesPresenterProvider = (): IPresenterProvider<IAgesScreens, IAgesPresenter> => {
    const getAgesAction = useDependency("getAgesAction") as IGetAgesAction;
  
    const editAgeAction = useDependency("editAgeAction") as IEditAgeAction;
  
    return {
      getPresenter(viewHandlers) {
        const presenter = AgesPresenter(getAgesAction, editAgeAction, viewHandlers);
        return presenter;
      },
    };
  };