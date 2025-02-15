import { beforeEach, describe, expect, test } from "vitest";
import { AGREEMENT_RESPONSE, agreementGatewayMock, saveAgreementParamsMock } from "../../../mocks";
import { ISaveAgreementAction, SaveAgreementAction } from '../../../../../../src/modules/ManageParameters/preFilterAgreement/core/actions/SaveAgreementAction';
import IPreFilterAgreement from "../../../../../../src/modules/ManageParameters/preFilterAgreement/core/entities/IPreFilterAgreement";

describe("SaveAgreementAction", () => {
  let saveAgreement: ISaveAgreementAction;

  beforeEach(() => {
    saveAgreement = SaveAgreementAction(agreementGatewayMock);
  });

  test("Call AgreementsGateway when GetRegistersAction is executed", async () => {
    agreementGatewayMock.saveAgreement.mockResolvedValue(AGREEMENT_RESPONSE);
    await saveAgreement.execute(saveAgreementParamsMock as Partial<IPreFilterAgreement>);
    expect(agreementGatewayMock.saveAgreement).toHaveBeenCalled();
  });

  test("SaveAgreementAction returns the AgreementsGateway response", async () => {
    agreementGatewayMock.saveAgreement.mockResolvedValue(AGREEMENT_RESPONSE);
    const result = await saveAgreement.execute(saveAgreementParamsMock as Partial<IPreFilterAgreement>);
    expect(result).toEqual(AGREEMENT_RESPONSE);
  });

  test("When SaveAgreementAction execution fails, catch the error and return it", async () => {
    const error = new Error("Error");
    agreementGatewayMock.saveAgreement.mockRejectedValue(error);
    saveAgreement.execute(saveAgreementParamsMock as Partial<IPreFilterAgreement>).catch((err) => expect(err).toEqual(error));
  });
});
