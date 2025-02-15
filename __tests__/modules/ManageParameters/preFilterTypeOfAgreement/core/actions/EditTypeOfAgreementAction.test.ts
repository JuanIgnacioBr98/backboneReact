import { beforeEach, describe, expect, test } from "vitest";
import { TYPE_OF_AGREEMENT_RESPONSE, typeOfAgreementGatewayMock, editTypeOfAgreementParamsMock, } from "../../../mocks";
import { EditTypeOfAgreementAction, IEditTypeOfAgreementAction } from "../../../../../../src/modules/ManageParameters/preFilterTypeOfAgreement/core/actions/EditTypeOfAgreementAction";

describe("EditTypeOfAgreementAction", () => {
    let editTypeOfAgreement: IEditTypeOfAgreementAction;

    beforeEach(() => {
        editTypeOfAgreement = EditTypeOfAgreementAction(typeOfAgreementGatewayMock);
    });

    test("Call TypeOfAgreemenGateway when EditTypeOfAgreementAction is executed", async () => {
        typeOfAgreementGatewayMock.editTypeOfAgreement.mockResolvedValue(TYPE_OF_AGREEMENT_RESPONSE);
        await editTypeOfAgreement.execute(editTypeOfAgreementParamsMock.body, "24");
        expect(typeOfAgreementGatewayMock.editTypeOfAgreement).toHaveBeenCalledWith(editTypeOfAgreementParamsMock.body, "24");
    });

    test("EditTypeOfAgreementAction returns the TypeOfAgreementsGateway response", async () => {
        typeOfAgreementGatewayMock.editTypeOfAgreement.mockResolvedValue(TYPE_OF_AGREEMENT_RESPONSE);
        const result = await editTypeOfAgreement.execute(editTypeOfAgreementParamsMock.body, "24");
        expect(result).toEqual(TYPE_OF_AGREEMENT_RESPONSE);
    });

    test("When EditTypeOfAgreementAction execution fails, catch the error and return it", async () => {
        const error = new Error("Error");
        typeOfAgreementGatewayMock.editTypeOfAgreement.mockRejectedValue(error);
        await expect(editTypeOfAgreement.execute(editTypeOfAgreementParamsMock.body, "24")
    ).rejects.toThrow(error);
    });
});
