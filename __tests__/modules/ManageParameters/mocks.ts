import { vi } from "vitest";
import { IPipesGateway } from "../../../src/modules/ManageParameters/preFilterPipes/core/gateways/IPipesGateway";
import { IAgesGateway } from "../../../src/modules/ManageParameters/preFilterAge/core/gateways/IAgesGateway";
import {
  IEditPipeParams,
  ISavePipeParams,
} from "../../../src/modules/ManageParameters/preFilterPipes/core/entities/IPreFilterPipe";
import { IEditAgeParams } from "../../../src/modules/ManageParameters/preFilterAge/core/entities/IPreFilterAge";
import { IAgreementGateway } from "../../../src/modules/ManageParameters/preFilterAgreement/core/gateways/IAgreementsGateway";
import {
  IEditAgreementParams,
  ISaveAgreementParams,
} from "../../../src/modules/ManageParameters/preFilterAgreement/core/entities/IPreFilterAgreement";
import { IEditSegmentParams } from "../../../src/modules/ManageParameters/preFilterSegments/core/entities/IPreFilterSegment";
import { ISegmentsGateway } from "../../../src/modules/ManageParameters/preFilterSegments/core/gateways/ISegmentsGateway";
import { mock } from "vitest-mock-extended";
import { IHttpClient } from "../../../src/modules/httpClient/interfaces";
import { ITypeOfAgreementGateway } from "../../../src/modules/ManageParameters/preFilterTypeOfAgreement/core/gateways/ITypeOfAgreementGateway";
import { IEditTypeOfAgreementParams, ISaveTypeOfAgreementParams } from "../../../src/modules/ManageParameters/preFilterTypeOfAgreement/core/entities/ITypeOfAgreement";

export const httpClientMock = mock<IHttpClient>();
export const pipesGatewayMock = mock<IPipesGateway>();
export const agreementGatewayMock = mock<IAgreementGateway>();
export const typeOfAgreementGatewayMock = mock<ITypeOfAgreementGateway>();

export const editPipeParamsMock: IEditPipeParams = {
  id: "24",
  body: { value: "test1" },
};

export const savePipeParamsMock: ISavePipeParams = {
  body: { key: "Updated Item", order: 2, value: "test" },
};

export const editAgeParamsMock: IEditAgeParams = {
  id: "1",
  body: { minAge: 18, maxAge: 50 },
};

export const saveAgreementParamsMock: ISaveAgreementParams = {
  body: { number: 20, name: "Avanza", typeId: 2 },
};

export const saveTypeOfAgreementParamsMock: ISaveTypeOfAgreementParams = {
  body: {
    decision: "Avanza",
    typeOfEmployer: "4-otros",
}
};

export const editSegmentParamsMock: IEditSegmentParams = {
  id: "1",
  body: {
    overdueDaysPP: 999999999,
    overdueDaysTC: 123456789,
    globalMaxAmount: 123456789,
    maxTransactionAmount: 123456789,
    affectation: 100,
    globalIndebtedness: 50,
  },
};

export const actionBodyMock = { value: "New Name" };
export const saveBodyMock = {
  id: "7",
  key: "Updated Item",
  order: 2,
  value: "test",
};

export const actionIdMock = "21";

export const actionSegmentBodyMock = {
  overdueDaysPP: 999999999,
  overdueDaysTC: 123456789,
  globalMaxAmount: 123456789,
  maxTransactionAmount: 123456789,
  affectation: 100,
  globalIndebtedness: 50,
};
export const actionSegmentIdMock = "1";

export const agesGatewaysuccessMock: IAgesGateway = {
  getAges: vi.fn(),
  editAge: vi.fn().mockResolvedValue({ success: true }),
};

export const agesGatewayFailedMock: IAgesGateway = {
  editAge: vi.fn().mockRejectedValue(new Error("Failed to edit age")),
  getAges: vi.fn(),
};

export const agreementsGatewaysuccessMock: IAgreementGateway = {
  getAgreements: vi.fn(),
  editAgreement: vi.fn().mockResolvedValue({ success: true }),
  saveAgreement: vi.fn().mockResolvedValue({ success: true }),
  AGREEMENT_RESPONSE: vi.fn().mockResolvedValue({ success: true }),
};

export const typeOfAgreementGatewaysuccessMock: ITypeOfAgreementGateway = {
  editTypeOfAgreement: vi.fn().mockResolvedValue({ success: true }),
  saveTypeOfAgreement: vi.fn().mockResolvedValue({ success: true }),
  deleteTypeOfAgreement: vi.fn().mockResolvedValue({ success: true }),
  TYPE_OF_AGREEMENT_RESPONSE: vi.fn().mockResolvedValue({ success: true }),
};

export const agreementsGatewayFailedMock: IAgreementGateway = {
  editAgreement: vi
    .fn()
    .mockRejectedValue(new Error("Failed to edit agreement")),
  getAgreements: vi.fn(),
  saveAgreement: vi
    .fn()
    .mockRejectedValue(new Error("Failed to save agreement")),
  deleteAgreement: vi.fn(),
};

export const segmentsGatewaysuccessMock: ISegmentsGateway = {
  getSegments: vi.fn(),
  editSegment: vi.fn().mockResolvedValue({ success: true }),
};

export const segmentsGatewayFailedMock: ISegmentsGateway = {
  editSegment: vi.fn().mockRejectedValue(new Error("Failed to edit segment")),
  getSegments: vi.fn(),
};

export const mockPipesData = {
  status: true,
  data: [{ id: "1", value: "Pipe 1" }],
};
export const getActionErrorMock = {
  status: false,
  error: "Failed to fetch pipes",
};

export const responseSuccesfullEditMock = {
  status: true,
  data: { id: "1", value: "Updated Pipe" },
};

export const responseSuccesfullSaveMock = {
  status: true,
  data: { id: "7", key: "Updated Item", order: 2, value: "test" },
};

export const responseErrorEditMock = {
  error: { message: "Failed to fetch pipes" },
};

export const mockAgesData = {
  status: true,
  data: [
    {
      id: "1",
      age: 25,
      agePermanence: 20,
      gender: "Masculino",
      maxAge: 50,
      minAge: 18,
      segment: "Publico",
    },
  ],
};

export const getAgeActionErrorMock = {
  status: false,
  error: "Failed to fetch ages",
};

export const responseSuccesfullEditAgeMock = {
  status: true,
  data: { message: "Age updated successfully" },
};

export const responseErrorEditAgeMock = {
  status: false,
  error: "Failed to edit age",
};

export const mockAgreementData = {
  status: true,
  data: [{ id: "1", value: "Agreement 1" }],
};

export const getAgreementsActionErrorMock = {
  status: false,
  error: "Failed to fetch agreements",
};

export const getTypeOfAgreementsActionErrorMock = {
  status: false,
  error: "Failed to fetch type of agreements",
};

export const responseSuccesfullEditAgreementMock = {
  message: "Agreement editado correctamente",
};
export const responseErrorEditAgreementMock = {
  status: false,
  error: {
    status: false,
    error: "Error al editar el convenio",
  },
};

export const responseErrorEditTypeOfAgreementMock = {
  status: false,
  error: "Error al editar el tipo de convenio",
};

export const responseSuccessfullSaveAgreementResponse = {
  status: true,
  data: { message: "Convenio creado correctamente" },
};

export const responseErrorSaveAgreementMock = {
  status: false,
  error: {
    status: false,
    error: "Error al crear el convenio",
  },
};

export const responseErrorSaveTypeOfAgreementMock = {
  status: false,
  error: "Error al crear el tipo de convenio",
};

export const responseSuccessfullDeleteAgreementResponse = {
  status: true,
  data: { message: "Convenio eliminado correctamente" },
};

export const responseErrorDeleteAgreementResponse = {
  status: false,
  error: "Error al eliminar el convenio",
};

export const responseErrorDeleteTypeOfAgreementMock = {
  status: false,
  error: "Error al eliminar el tipo de convenio",
};

export const saveAgreementMock = {
  body: {
    name: "New Agreement",
    description: "Description of the agreement",
  },
};

export const successAgreementResponseMock = {
  status: true,
  data: {
    id: "123",
    name: "New Agreement",
    description: "Description of the agreement",
    createdAt: "2024-12-01T00:00:00Z",
  },
};

export const deleteAgreementResponseMock = {
  status: true,
  data: {
    message: "Agreement deleted successfully",
  },
};

export const mockGetSegmentResponse = {
  status: true,
  data: [
    {
      id: "1",
      segment: "Jubilado",
      days_late_pp: 999999999,
      days_late_tc: 123456789,
      global_max_amount: 123456789,
      max_transaction_amount: 123456789,
      affectation: 100,
      global_indebtedness: 50,
    },
  ],
};

export const expectedTransformedSegmentData = mockGetSegmentResponse.data.map(
  (segmentRes) => ({
    id: segmentRes.id,
    segment: segmentRes.segment,
    overdueDaysTC: segmentRes.days_late_tc,
    overdueDaysPP: segmentRes.days_late_pp,
    globalMaxAmount: segmentRes.global_max_amount,
    maxTransactionAmount: segmentRes.max_transaction_amount,
    affectation: segmentRes.affectation,
    globalIndebtedness: segmentRes.global_indebtedness,
  })
);

export const getSegmentActionErrorMock = {
  status: false,
  error: "Failed to fetch segments",
};

export const responseSuccesfullEditSegmentMock = {
  status: true,
  data: { message: "Segment edited successfully" },
};

export const responseErrorEditSegmentMock = {
  status: false,
  error: "Failed to edit segment",
};

export const GET_PIPES_RESPONSE = [
  {
    id: 24,
    order: 1223,
    key: "90",
    value: "test1",
  },
  {
    id: 3,
    order: 1,
    key: "45",
    value: "test2",
  },
];

export const PIPES_RESPONSE = {
  id: 24,
  order: 1223,
  key: "90",
  value: "test1",
};

export const GATEWAY_GET_PIPES_SUCCESS_RESPONSE = {
  status: true,
  data: GET_PIPES_RESPONSE,
};

export const GATEWAY_PIPE_SUCCESS_RESPONSE = {
  status: true,
  data: PIPES_RESPONSE,
};

export const GET_AGES_RESPONSE = [
  {
    id: 4,
    segment: "pensions",
    gender: "Masculino",
    maxAge: 75,
    minAge: 55,
    agePermanence: 42,
  },
  {
    id: 2,
    segment: "retired",
    gender: "Masculino",
    maxAge: 75,
    minAge: 55,
    agePermanence: 111111111,
  },
  {
    id: 6,
    segment: "public",
    gender: "Masculino",
    maxAge: 18,
    minAge: 18,
    agePermanence: 2,
  },
  {
    id: 8,
    segment: "private",
    gender: "Masculino",
    maxAge: 82,
    minAge: 59,
    agePermanence: 4,
  },
];

export const AGES_RESPONSE = {
  id: 8,
  segment: "private",
  gender: "Masculino",
  maxAge: 82,
  minAge: 59,
  agePermanence: 4,
};

export const GATEWAY_GET_AGES_SUCCESS_RESPONSE = {
  status: true,
  data: GET_AGES_RESPONSE,
};

export const GATEWAY_AGE_SUCCESS_RESPONSE = {
  status: true,
  data: PIPES_RESPONSE,
};

export const GET_AGREEMENT_RESPONSE = [
  {
    id: 1,
    number: 1,
    name: "Convenio 1",
    typeId: 1,
  },
  {
    id: 2,
    number: 2,
    name: "Convenio 2",
    typeId: 2,
  },
];

export const AGREEMENT_RESPONSE = {
  id: 2,
  number: 20,
  name: "Avanza",
  typeId: 2,
};

export const TYPE_OF_AGREEMENT_RESPONSE = {
  id: 2,
  decision: "Avanza",
  typeOfEmployer: "01-Otros",
};

export const GET_TYPE_OF_AGREEMENT_RESPONSE = [
  {
    id: 1,
    type_of_employer: "Test 1",
    decision: "Avanza"
  },
  {
    id: 2,
    type_of_employer: "Convenio test 2",
    decision: "Rechazado"
  },
];

export const GATEWAY_GET_TYPE_OF_AGREEMENT_SUCCESS_RESPONSE = {
  status: true,
  data: GET_TYPE_OF_AGREEMENT_RESPONSE,
};

export const GATEWAY_GET_AGREEMENT_SUCCESS_RESPONSE = {
  status: true,
  data: GET_AGREEMENT_RESPONSE,
};


export const GATEWAY_AGREEMENT_SUCCESS_RESPONSE = {
  status: true,
  data: AGREEMENT_RESPONSE,
};

export const GATEWAY_TYPE_OF_AGREEMENT_SUCCESS_RESPONSE = {
  status: true,
  data: TYPE_OF_AGREEMENT_RESPONSE,
};

export const editAgreementParamsMock: IEditAgreementParams = {
  id: AGREEMENT_RESPONSE.id.toString(),
  body: { name: "Name test", number: 2 },
};

export const editTypeOfAgreementParamsMock: IEditTypeOfAgreementParams = {
  id: TYPE_OF_AGREEMENT_RESPONSE.id.toString(),
  body: { typeOfEmployer: "N test", decision: "Avanza" },
};

export const expectedTransformedAgreementData =
  GATEWAY_GET_AGREEMENT_SUCCESS_RESPONSE.data.map((agreementRes) => ({
    id: agreementRes.id,
    number: agreementRes.number,
    name: agreementRes.name,
    typeOfAgreement: agreementRes.typeId,
  }));

export const expectedTransformedTypeOfAgreementData =
  GATEWAY_GET_TYPE_OF_AGREEMENT_SUCCESS_RESPONSE.data.map((agreementRes) => ({
    id: agreementRes.id,
    typeOfEmployer: agreementRes.type_of_employer,
    decision: agreementRes.decision
  }));

export const expectedTransformedAgreementResponseData = {
  id: 2,
  number: 20,
  name: "Avanza",
  typeOfAgreement: 2,
};
