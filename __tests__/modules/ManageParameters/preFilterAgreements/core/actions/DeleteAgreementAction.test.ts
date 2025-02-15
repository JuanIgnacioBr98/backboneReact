import { beforeEach, describe, expect, test } from "vitest";
import { AGREEMENT_RESPONSE, agreementGatewayMock } from "../../../mocks";
import { DeleteAgreementAction, IDeleteAgreementAction } from '../../../../../../src/modules/ManageParameters/preFilterAgreement/core/actions/DeleteAgreementAction';

describe("DeleteAgreementAction", () => {
  let deleteAgreement: IDeleteAgreementAction;

  beforeEach(() => {
    deleteAgreement = DeleteAgreementAction(agreementGatewayMock);
  });

  test("Call AgreementsGateway when GetRegistersAction is executed", async () => {
    agreementGatewayMock.deleteAgreement.mockResolvedValue(AGREEMENT_RESPONSE);
    await deleteAgreement.execute("24");
    expect(agreementGatewayMock.deleteAgreement).toHaveBeenCalled();
  });

  test("DeleteAgreementAction returns the AgreementsGateway response", async () => {
    agreementGatewayMock.deleteAgreement.mockResolvedValue(AGREEMENT_RESPONSE);
    const result = await deleteAgreement.execute("24");
    expect(result).toEqual(AGREEMENT_RESPONSE);
  });

  test("When DeleteAgreementAction execution fails, catch the error and return it", async () => {
    const error = new Error("Error");
    agreementGatewayMock.deleteAgreement.mockRejectedValue(error);
    deleteAgreement.execute("24").catch((err) => expect(err).toEqual(error));
  });
});
