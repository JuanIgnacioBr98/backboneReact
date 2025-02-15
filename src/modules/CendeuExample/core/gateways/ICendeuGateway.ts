import { GetRegistersParams } from "../../../Leads/core/entities/GetRegistersParams";
import { IResponsePaginatedRegister } from "../../../Leads/core/entities/IResponsePaginatedRegisters";
import { ProcessFileResponse } from "../entities/ProcessFileResponse";

export interface ICendeuGateway {
  processFile: (file: File, period: string) => Promise<ProcessFileResponse>;
  getRegisters: (
    params: GetRegistersParams
  ) => Promise<IResponsePaginatedRegister>;
  getFileData: (
    fileName: string
  ) => Promise<{ fileName: string; base64: string }>;
  getErrorFile: (
    period: string,
    type: string
  ) => Promise<{ fileName: string; base64: string }>;
}
