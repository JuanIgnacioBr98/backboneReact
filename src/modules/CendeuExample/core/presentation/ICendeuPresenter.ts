import { GetRegistersParams } from "../../../Leads/core/entities/GetRegistersParams";

export interface ICendeuPresenter {
  processFile: (file: File, period: string) => Promise<void>;
  getRegisters: (params: GetRegistersParams) => Promise<void>;
  downloadFile: (fileName: string) => Promise<void>;
  updateFileStatus: (fileName: string, status: boolean) => Promise<void>;
  downloadErrorFile: (period: string, type: string) => Promise<void>;
}
