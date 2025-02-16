import { IDownloadFileByNameAction } from "../../core/actions/DownloadFileByNameAction";
import { IGetRegistersAction } from "../../core/actions/GetRegistersAction";
import { IProcessFileAction } from "../../core/actions/ProcessFileAction";
import { ICendeuPresenter } from "../../core/presentation/ICendeuPresenter";
import { ICendeuScreen } from "../../core/screens/ICendeuScreen";
import { IDownloadErrorFileAction } from "../../core/actions/DownloadErrorFileAction";

export const CendeuPresenter = (
  processFile: IProcessFileAction,
  getRegisters: IGetRegistersAction,
  downloadFileByName: IDownloadFileByNameAction,
  cendeuScreen: ICendeuScreen,
  downloadErrorFile: IDownloadErrorFileAction
): ICendeuPresenter => {
  return {
    async processFile(file, period) {
      try {
        const res = await processFile.execute(file, period);
        cendeuScreen.onProcessFileSuccess(res);
      } catch (error) {
        cendeuScreen.onProcessFileError(error);
      }
    },
    async getRegisters(params) {
      try {
        const res = await getRegisters.execute(params);
        cendeuScreen.onGetRegistersSuccess(res);
      } catch (error) {
        cendeuScreen.onGetRegistersError(error);
      }
    },

    async downloadFile(fileName) {
      try {
        await downloadFileByName.execute(fileName);
        cendeuScreen.onDownloadFileSuccess();
      } catch (_) {
        cendeuScreen.onDownloadFileError();
      }
    },
    async downloadErrorFile(period, type) {
      try {
        await downloadErrorFile.execute(period, type);
        cendeuScreen.onDownloadFileSuccess();
      } catch (error) {
        cendeuScreen.onDownloadFileError();
      }
    },
  };
};
