import { IHttpClient } from "../../../httpClient/interfaces";
import { HttpResponse } from "../../../httpClient/interfaces";
import { ProcessFileResponse } from "../../core/entities/ProcessFileResponse";
import { ICendeuGateway } from "../../core/gateways/ICendeuGateway";

export const CendeuGateway = (httpClient: IHttpClient): ICendeuGateway => {
  return {
    async processFile(file: File, period: string) {
      try {
        const response = await httpClient.post("API PATH")
        
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
  };
};


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
