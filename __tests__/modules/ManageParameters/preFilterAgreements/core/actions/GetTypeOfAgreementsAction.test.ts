import { beforeEach, describe, expect, test } from "vitest";
import { agreementGatewayMock, GET_TYPE_OF_AGREEMENT_RESPONSE } from "../../../mocks";
import { GetTypeOfAgreementsAction, IGetTypeOfAgreementsAction } from '../../../../../../src/modules/ManageParameters/preFilterAgreement/core/actions/GetTypeOfAgreementsAction';

describe("GetTypeOfAgreementsAction", () => {
  let getTypeOfAgreements: IGetTypeOfAgreementsAction;

  beforeEach(() => {
    getTypeOfAgreements = GetTypeOfAgreementsAction(agreementGatewayMock);
  });

  test("Call AgreementsGateway when GetTypeOfAgreementsction is executed", async () => {
    agreementGatewayMock.getTypeOfAgreements.mockResolvedValue(GET_TYPE_OF_AGREEMENT_RESPONSE);
    await getTypeOfAgreements.execute();
    expect(agreementGatewayMock.getTypeOfAgreements).toHaveBeenCalled();
  });

  test("GetTypeOfAgreementsAction returns the AgreementsGateway response", async () => {
    agreementGatewayMock.getTypeOfAgreements.mockResolvedValue(GET_TYPE_OF_AGREEMENT_RESPONSE);
    const result = await getTypeOfAgreements.execute();
    expect(result).toEqual(GET_TYPE_OF_AGREEMENT_RESPONSE);
  });

  test("When GetTypeOfAgreementsAction execution fails, catch the error and return it", async () => {
    const error = new Error("Error");
    agreementGatewayMock.getTypeOfAgreements.mockRejectedValue(error);
    getTypeOfAgreements.execute().catch((err) => expect(err).toEqual(error));
  });
});
