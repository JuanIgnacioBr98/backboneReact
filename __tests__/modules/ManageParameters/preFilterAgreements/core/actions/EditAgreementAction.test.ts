import { beforeEach, describe, expect, test } from "vitest";
import { AGREEMENT_RESPONSE, GET_AGREEMENT_RESPONSE, GET_PIPES_RESPONSE, agreementGatewayMock, editAgreementParamsMock } from "../../../mocks";
import { EditAgreementAction, IEditAgreementAction } from '../../../../../../src/modules/ManageParameters/preFilterAgreement/core/actions/EditAgreementAction';
import IPreFilterAgreement from "../../../../../../src/modules/ManageParameters/preFilterAgreement/core/entities/IPreFilterAgreement";

describe("EditAgreementAction", () => {
  let editAgreement: IEditAgreementAction;

  beforeEach(() => {
    editAgreement = EditAgreementAction(agreementGatewayMock);
  });

  test("Call AgreementsGateway when GetRegistersAction is executed", async () => {
    agreementGatewayMock.editAgreement.mockResolvedValue(AGREEMENT_RESPONSE);
    await editAgreement.execute(editAgreementParamsMock as Partial<IPreFilterAgreement>,"24");
    expect(agreementGatewayMock.editAgreement).toHaveBeenCalled();
  });

  test("EditAgreementAction returns the AgreementsGateway response", async () => {
    agreementGatewayMock.editAgreement.mockResolvedValue(GET_AGREEMENT_RESPONSE);
    const result = await editAgreement.execute(editAgreementParamsMock as Partial<IPreFilterAgreement>, "24");
    expect(result).toEqual(GET_AGREEMENT_RESPONSE);
  });

  test("When EditAgreementAction execution fails, catch the error and return it", async () => {
    const error = new Error("Error");
    agreementGatewayMock.editAgreement.mockRejectedValue(error);
    editAgreement.execute(editAgreementParamsMock as Partial<IPreFilterAgreement>,"24").catch((err) => expect(err).toEqual(error));
  });
});
