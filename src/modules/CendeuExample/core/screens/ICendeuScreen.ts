import { ProcessFileResponse } from "../entities/ProcessFileResponse";

export interface ICendeuScreen {
  onProcessFileSuccess: (result: ProcessFileResponse) => void;
  onProcessFileError: (error: string) => void;
  onDownloadFileSuccess: () => void;
  onDownloadFileError: () => void;
  updateStatusSuccess: () => void;
  updateStatusError: () => void;
}
