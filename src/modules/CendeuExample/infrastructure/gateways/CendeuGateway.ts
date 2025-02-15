import { format } from "date-fns";
import { apis } from "../../../../constants/api";
import { IHttpClient } from "../../../httpClient/interfaces";
import { HttpResponse } from "../../../httpClient/interfaces";
import { FileType } from "../../../Leads/core/entities/FileTypeEnum";
import { IResponsePaginatedRegister } from "../../../Leads/core/entities/IResponsePaginatedRegisters";
import { ProcessFileResponse } from "../../core/entities/ProcessFileResponse";
import { ICendeuGateway } from "../../core/gateways/ICendeuGateway";

export const CendeuGateway = (httpClient: IHttpClient): ICendeuGateway => {
  return {
    async processFile(file: File, period: string) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("period", format(new Date(period), "yyyy-MM"));
        formData.append("type", FileType.CENDEU);
        const response = await httpClient.post(apis.fileLogs.upload, formData, {
          "Content-Type": "multipart/form-data",
        });

        if (!response.status) {
          return Promise.reject(response.error);
        }
        return Promise.resolve(mapResponseToProcessFileResponse(response));
      } catch (error) {
        if (error.error.message.search("períodos")) {
          return Promise.reject({ period: true });
        }
        return Promise.reject(error);
      }
    },

    async getRegisters(params) {
      try {
        const response = await httpClient.get(apis.fileLogs.fileLogs, params);
        if (!response.status) {
          return Promise.reject(response.error);
        }
        return Promise.resolve(mapResponseToRegister(response));
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async getFileData(fileName) {
      try {
        const response = await httpClient.get(
          `${apis.fileLogs.download}/${FileType.CENDEU}/${fileName}`
        );

        if (!response.status) {
          return Promise.reject(response.error);
        }
        return Promise.resolve(response.data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    
    async getErrorFile(period, type) {
      try {
        const response = await httpClient.post(
          `${apis.fileLogs.error}`,
          { period, type }
        );
    
        if (!response.status) {
          return Promise.reject(response.error);
        }
    
        return Promise.resolve(response.data);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  };
};

const mapResponseToRegister = (
  response: HttpResponse
): IResponsePaginatedRegister => ({
  totalItems: response.data.totalItems,
  totalPages: response.data.totalPages,
  currentPage: parseInt(response.data.currentPage, 10),
  registers: response.data.registers.map((registerRes) => ({
    id: registerRes.id,
    fileName: registerRes.file_name,
    period: registerRes.period,
    status: registerRes.status,
    entriesAmount: registerRes.processed_rows,
    errorsFound: registerRes.fail_rows,
    errorFileName: registerRes.error_file_name,
    creationDate: registerRes.createdAt,
  })),
});

const mapResponseToProcessFileResponse = (
  response: HttpResponse
): ProcessFileResponse => {
  const { data } = response.data;
  return {
    errors: data.fail_rows,
    entries: data.processed_rows,
    fileName: data.file_name,
  };
};
