import { beforeEach, describe, expect, test } from "vitest";
import { TYPE_OF_AGREEMENT_RESPONSE, typeOfAgreementGatewayMock } from "../../../mocks";
import { DeleteTypeOfAgreementAction, IDeleteTypeOfAgreementAction } from "../../../../../../src/modules/ManageParameters/preFilterTypeOfAgreement/core/actions/DeleteTypeOfAgreementAction";

describe("DeleteTypeOfAgreementAction", () => {
    let deleteTypeOfAgreement: IDeleteTypeOfAgreementAction;

    beforeEach(() => {
        deleteTypeOfAgreement = DeleteTypeOfAgreementAction(typeOfAgreementGatewayMock);
    });

    test("Call TypeOfAgreementGateway when GetRegistersAction is executed", async () => {
        typeOfAgreementGatewayMock.deleteTypeOfAgreement.mockResolvedValue(TYPE_OF_AGREEMENT_RESPONSE);
        await deleteTypeOfAgreement.execute("24");
        expect(typeOfAgreementGatewayMock.deleteTypeOfAgreement).toHaveBeenCalled();
    });

    test("DeleteTypeOfAgreementAction returns the TypeOfAgreementsGateway response", async () => {
        typeOfAgreementGatewayMock.deleteTypeOfAgreement.mockResolvedValue(TYPE_OF_AGREEMENT_RESPONSE);
        const result = await deleteTypeOfAgreement.execute("24");
        expect(result).toEqual(TYPE_OF_AGREEMENT_RESPONSE);
    });

    test("When DeleteTypeOfAgreementAction execution fails, catch the error and return it", async () => {
        const error = new Error("Error");
        typeOfAgreementGatewayMock.deleteTypeOfAgreement.mockRejectedValue(error);
        deleteTypeOfAgreement.execute("24").catch((err) => expect(err).toEqual(error));
    });
});
