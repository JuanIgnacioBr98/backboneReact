import { describe, beforeEach, expect, test } from "vitest";
import { GenerateRucAction, IGenerateRucAction } from "../../../../../src/modules/Ruc/core/actions/GenerateRucAction";
import { GENERATE_RUC_RESPONSE, generateRucParamsMock, rucGatewayMock } from "../../mocks";

describe("GenerateRucAction", () => {
  let generateRucAction: IGenerateRucAction;

  beforeEach(() => {
    generateRucAction = GenerateRucAction(rucGatewayMock);
  });

  test("Call LeadsGateway when GenerateRucAction is executed", async () => {
    rucGatewayMock.generateRuc.mockResolvedValue(GENERATE_RUC_RESPONSE);
    await generateRucAction.execute(generateRucParamsMock);
    expect(rucGatewayMock.generateRuc).toHaveBeenCalled();
  });

  test("GenerateRucAction returns the LeadsGateway response", async () => {
    rucGatewayMock.generateRuc.mockResolvedValue(GENERATE_RUC_RESPONSE);
    const result = await generateRucAction.execute(generateRucParamsMock);
    expect(result).toEqual(GENERATE_RUC_RESPONSE);
  });

  test("When GenerateRucAction execution fails, catch the error and return it", async () => {
    const error = new Error("Error");
    rucGatewayMock.generateRuc.mockRejectedValue(error);
    generateRucAction.execute(generateRucParamsMock).catch((err) => expect(err).toEqual(error));
  });
});
