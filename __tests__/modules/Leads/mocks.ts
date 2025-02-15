import { mock } from "vitest-mock-extended";
import { vi } from "vitest";
import { ILeadsGateway } from "../../../src/modules/Leads/core/gateways/ILeadsGateway";
import { IUpdateFileStatusGateway } from "../../../src/modules/Leads/core/gateways/IUpdateFileStatusGateway";
import { IHttpClient } from "../../../src/modules/httpClient/interfaces";

export const leadsGatewayMock = mock<ILeadsGateway>();
export const fileMock = mock<File>();

export const mockGetRegistersParams = { type: "TEST", page: 1, size: 10 };
export const mockGetRegistersResponse = {
  status: true,
  data: {
    totalItems: 100,
    totalPages: 10,
    currentPage: "1",
    registers: [
      {
        id: "123",
        file_name: "testFile.csv",
        period: "2024-12",
        status: "completed",
        processed_rows: 200,
        fail_rows: 2,
        error_file_name: "errorLog.csv",
        createdAt: "2024-12-01T00:00:00Z",
      },
    ],
  },
};

export const mockFailedGetRegistersResponse = {
  status: false,
  error: "Failed to fetch registers",
};

export const mockSuccessGetRegistersResponse = {
  totalItems: 100,
  totalPages: 10,
  currentPage: 1,
  registers: [
    {
      id: "123",
      fileName: "testFile.csv",
      period: "2024-12",
      status: "completed",
      entriesAmount: 200,
      errorsFound: 2,
      errorFileName: "errorLog.csv",
      creationDate: "2024-12-01T00:00:00Z",
    },
  ],
};

export const updateFileStatusGateway = mock<IUpdateFileStatusGateway>();
export const fileName = "FileNameTest.txt";
export const httpClientMock = mock<IHttpClient>();

export const updateFileResponse = {
  code: 200,
  success: true,
  data: {
    id: 11,
    file_name: "RECHAZADOS_ACCICOM_CC76_Actualizado_Final-1734008983281.txt",
    type: "LEAD",
    period: "2024-05",
    status: true,
    processed_rows: 0,
    fail_rows: 999,
    error_file_name: "error_logs_leads.txt",
    createdAt: "2024-12-12T13:09:43.542Z",
    updatedAt: "2024-12-13T17:41:43.114Z",
  },
};

export const mockDocument = () => {
  global.document = {
    createElement: vi.fn(() => ({
      href: "",
      download: "",
      click: vi.fn(),
      remove: vi.fn(),
    })),
    body: {
      appendChild: vi.fn(),
      removeChild: vi.fn(),
    },
  } as unknown as Document;

  global.URL.createObjectURL = vi.fn();
  global.URL.revokeObjectURL = vi.fn();
};

export const mockErrorFileResponse = {
  base64: "dGVzdA==",
  fileName: "error_log.txt",
};

export const mockFileInputs = {
  period: "2024-12",
  type: "LEAD",
};