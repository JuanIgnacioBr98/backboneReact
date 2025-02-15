import { mock } from "vitest-mock-extended";
import { IRucGateway } from "../../../src/modules/Ruc/core/gateways/IRucGateway";
import { GenerateRucParameters } from "../../../src/modules/Ruc/core/entities/GenerateRucParameters";
import { IGetRucFileByPeriodGateway } from "../../../src/modules/Ruc/core/gateways/IGetRucFileByPeriodGateway";
import {
  HttpResponse,
  IHttpClient,
} from "../../../src/modules/httpClient/interfaces";

export const rucGatewayMock = mock<IRucGateway>();
export const GENERATE_RUC_RESPONSE = {
  entries: 30000,
};

export const generateRucParamsMock = {
  leadsFileName: "leads_12-2024.txt",
  cendeuFileName: "cendeu_12-2024.txt",
} as unknown as GenerateRucParameters;

export const GET_REGISTERS_RESPONSE = {
  registers: [
    {
      leadsFileName: "leads.txt",
      leadsPeriod: "12/2024",
      cendeuFileName: "cendeu.txt",
      cendeuPeriod: "12/2024",
      rucGenerated: "12/2024",
      entriesAmount: 12312,
      downloadLink: "google.com",
    },
    {
      leadsFileName: "leads.txt",
      leadsPeriod: "12/2024",
      cendeuFileName: "cendeu.txt",
      cendeuPeriod: "12/2024",
      rucGenerated: "12/2024",
      entriesAmount: 12312,
      downloadLink: "google.com",
    },
  ],
};

export const GET_LAST_PERIODS_RESPONSE = {
  leadsPeriod: "04/2024",
  cendeuPeriod: "02/2024",
  rucPeriod: "06/2024",
};

export const getRucFileByPeriodGateway = mock<IGetRucFileByPeriodGateway>();
export const httpClientMock = mock<IHttpClient>();
export const getRucFileResponse: HttpResponse = {
  code: 0,
  data: { result: "" },
  error: {
    message: "",
  },
  status: false,
};
