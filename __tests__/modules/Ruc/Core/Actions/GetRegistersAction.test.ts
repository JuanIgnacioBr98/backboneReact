import { describe, beforeEach, expect, test } from "vitest";
import { GET_REGISTERS_RESPONSE, rucGatewayMock } from "../../mocks";
import { GetRegistersAction, IGetRegistersAction } from "../../../../../src/modules/Ruc/core/actions/GetRegistersAction";

describe("GetRegistersAction", () => {
  let getRegisters: IGetRegistersAction;

  beforeEach(() => {
    getRegisters = GetRegistersAction(rucGatewayMock);
  });

  test("Call rucGateway when GetRegistersAction is executed", async () => {
    rucGatewayMock.getRegisters.mockResolvedValue(GET_REGISTERS_RESPONSE.registers);
    await getRegisters.execute();
    expect(rucGatewayMock.getRegisters).toHaveBeenCalled();
  });

  test("GetRegistersAction returns the rucGateway response", async () => {
    rucGatewayMock.getRegisters.mockResolvedValue(GET_REGISTERS_RESPONSE.registers);
    const result = await getRegisters.execute();
    expect(result).toEqual(GET_REGISTERS_RESPONSE.registers);
  });

  test("When GetRegistersAction execution fails, catch the error and return it", async () => {
    const error = new Error("Error");
    rucGatewayMock.getRegisters.mockRejectedValue(error);
    getRegisters.execute().catch((err) => expect(err).toEqual(error));
  });
});
