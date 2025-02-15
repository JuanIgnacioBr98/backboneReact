import { beforeEach, describe, expect, test } from "vitest";
import { TYPE_OF_AGREEMENT_RESPONSE, typeOfAgreementGatewayMock, saveTypeOfAgreementParamsMock } from "../../../mocks";
import { ISaveTypeOfAgreementAction, SaveTypeOfAgreementAction } from '../../../../../../src/modules/ManageParameters/preFilterTypeOfAgreement/core/actions/SaveTypeOfAgreementAction';
import { ITypeOfAgreement } from "../../../../../../src/modules/ManageParameters/preFilterTypeOfAgreement/core/entities/ITypeOfAgreement";

describe("SaveTypeOfAgreementAction", () => {
    let saveTypeOfAgreement: ISaveTypeOfAgreementAction;

    beforeEach(() => {
        saveTypeOfAgreement = SaveTypeOfAgreementAction(typeOfAgreementGatewayMock);
    });

    test("Call TypeOfAgreementGateway when SaveTypeOfAgreementAction is executed", async () => {
        typeOfAgreementGatewayMock.saveTypeOfAgreement.mockResolvedValue(TYPE_OF_AGREEMENT_RESPONSE);
        await saveTypeOfAgreement.execute(saveTypeOfAgreementParamsMock as Partial<ITypeOfAgreement>);
        expect(typeOfAgreementGatewayMock.saveTypeOfAgreement).toHaveBeenCalled();
    });

    test("SaveTypeOfAgreementAction returns the TypeOfAgreementGateway response", async () => {
        typeOfAgreementGatewayMock.saveTypeOfAgreement.mockResolvedValue(TYPE_OF_AGREEMENT_RESPONSE);
        const result = await saveTypeOfAgreement.execute(saveTypeOfAgreementParamsMock as Partial<ITypeOfAgreement>);
        expect(result).toEqual(TYPE_OF_AGREEMENT_RESPONSE);
    });

    test("When SaveTypeOfAgreementAction execution fails, catch the error and return it", async () => {
        const error = new Error("Error");
        typeOfAgreementGatewayMock.saveTypeOfAgreement.mockRejectedValue(error);
        saveTypeOfAgreement.execute(saveTypeOfAgreementParamsMock as Partial<ITypeOfAgreement>).catch((err) => expect(err).toEqual(error));
    });
});
