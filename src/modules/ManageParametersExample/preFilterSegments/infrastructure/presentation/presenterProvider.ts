/* eslint-disable react-hooks/rules-of-hooks */

import { IPresenterProvider } from '../../../../../utils/iPresenterProvider';
import { useDependency } from '../../../../../hooks/useDependency';
import { ISegmentsScreens } from '../../core/screens/ISegmentsScreens';
import { ISegmentsPresenter } from '../../core/presentation/ISegmentsPresenter';
import { IGetSegmentsAction } from '../../core/actions/GetSegmentsAction';
import { IEditSegmentAction } from '../../core/actions/EditSegmentAction';
import { SegmentsPresenter } from './SegmentsPresenter';

export const segmentsPresenterProvider = (): IPresenterProvider<ISegmentsScreens, ISegmentsPresenter> => {
    const getSegmentsAction = useDependency("getSegmentsAction") as IGetSegmentsAction;
  
    const editSegmentAction = useDependency("editSegmentAction") as IEditSegmentAction;
  
    return {
      getPresenter(viewHandlers) {
        const presenter = SegmentsPresenter(getSegmentsAction, editSegmentAction, viewHandlers);
        return presenter;
      },
    };
  };