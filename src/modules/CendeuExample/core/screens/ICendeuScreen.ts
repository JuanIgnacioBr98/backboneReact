import { IResponsePaginatedRegister } from "../../../Leads/core/entities/IResponsePaginatedRegisters";
import { ProcessFileResponse } from "../entities/ProcessFileResponse";

export interface ICendeuScreen {
  onProcessFileSuccess: (result: ProcessFileResponse) => void;
  onProcessFileError: (error: string) => void;
  onGetRegistersSuccess: (result: IResponsePaginatedRegister) => void;
  onGetRegistersError: (error: string) => void;
  onDownloadFileSuccess: () => void;
  onDownloadFileError: () => void;
  updateStatusSuccess: () => void;
  updateStatusError: () => void;
}
