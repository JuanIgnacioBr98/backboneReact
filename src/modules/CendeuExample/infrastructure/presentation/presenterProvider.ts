/* eslint-disable react-hooks/rules-of-hooks */

import { IPresenterProvider } from "../../../../utils/iPresenterProvider";
import { useDependency } from "../../../../hooks/useDependency";
import { CendeuPresenter } from "./CendeuPresenter";
import { IProcessFileAction } from "../../core/actions/ProcessFileAction";
import { ICendeuScreen } from "../../core/screens/ICendeuScreen";
import { ICendeuPresenter } from "../../core/presentation/ICendeuPresenter";
import { IGetRegistersAction } from "../../core/actions/GetRegistersAction";
import { IDownloadFileByNameAction } from "../../core/actions/DownloadFileByNameAction";
import { IUpdateFileStatusAction } from "../../core/actions/UpdateFileStatusAction";
import { IDownloadErrorFileAction } from "../../core/actions/DownloadErrorFileAction";

export const cendeuPresenterProvider = (): IPresenterProvider<
  ICendeuScreen,
  ICendeuPresenter
> => {
  const processFileAction = useDependency(
    "cendeuProcessFileAction"
  ) as IProcessFileAction;
  const getRegistersAction = useDependency(
    "cendeuGetRegistersAction"
  ) as IGetRegistersAction;
  const downloadFileByNameAction = useDependency(
    "cendeuDownloadFileByNameAction"
  ) as IDownloadFileByNameAction;
  const downloadErrorFileAction = useDependency(
    "cendeuDownloadErrorFileAction"
  ) as IDownloadErrorFileAction;
  const updateFileStatusActionCendeu = useDependency(
    "updateFileStatusActionCendeu"
  ) as IUpdateFileStatusAction;

  return {
    getPresenter(viewHandlers) {
      const presenter = CendeuPresenter(
        processFileAction,
        getRegistersAction,
        downloadFileByNameAction,
        updateFileStatusActionCendeu,
        viewHandlers,
        downloadErrorFileAction,
      );
      return presenter;
    },
  };
};
