import { beforeEach, describe, expect, test } from "vitest";
import { agreementGatewayMock, GET_AGREEMENT_RESPONSE } from "../../../mocks";
import { GetAgreementsAction, IGetAgreementsAction } from '../../../../../../src/modules/ManageParameters/preFilterAgreement/core/actions/GetAgreementsAction';

describe("GetAgreementsAction", () => {
  let getAgreements: IGetAgreementsAction;

  beforeEach(() => {
    getAgreements = GetAgreementsAction(agreementGatewayMock);
  });

  test("Call AgreementsGateway when GetRegistersAction is executed", async () => {
    agreementGatewayMock.getAgreements.mockResolvedValue(GET_AGREEMENT_RESPONSE);
    await getAgreements.execute();
    expect(agreementGatewayMock.getAgreements).toHaveBeenCalled();
  });

  test("GetAgreementsAction returns the AgreementsGateway response", async () => {
    agreementGatewayMock.getAgreements.mockResolvedValue(GET_AGREEMENT_RESPONSE);
    const result = await getAgreements.execute();
    expect(result).toEqual(GET_AGREEMENT_RESPONSE);
  });

  test("When GetAgreementsAction execution fails, catch the error and return it", async () => {
    const error = new Error("Error");
    agreementGatewayMock.getAgreements.mockRejectedValue(error);
    getAgreements.execute().catch((err) => expect(err).toEqual(error));
  });
});
