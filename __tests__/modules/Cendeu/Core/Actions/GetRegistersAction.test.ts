import { describe, beforeEach, expect, test } from "vitest";
import { cendeuGatewayMock } from "../../mocks";
import {
  GetRegistersAction,
  IGetRegistersAction,
} from "../../../../../src/modules/Cendeu/core/actions/GetRegistersAction";
import { GET_REGISTERS_RESPONSE } from "../../responseExamples";

describe("GetRegistersAction", () => {
  let getRegisters: IGetRegistersAction;

  beforeEach(() => {
    getRegisters = GetRegistersAction(cendeuGatewayMock);
  });

  test("Call CendeuGateway when GetRegistersAction is executed", async () => {
    cendeuGatewayMock.getRegisters.mockResolvedValue(GET_REGISTERS_RESPONSE.registers);
    await getRegisters.execute();
    expect(cendeuGatewayMock.getRegisters).toHaveBeenCalled();
  });

  test("GetRegistersAction returns the CendeuGateway response", async () => {
    cendeuGatewayMock.getRegisters.mockResolvedValue(GET_REGISTERS_RESPONSE.registers);
    const result = await getRegisters.execute();
    expect(result).toEqual(GET_REGISTERS_RESPONSE.registers);
  });

  test("When GetRegistersAction execution fails, catch the error and return it", async () => {
    const error = new Error("Error");
    cendeuGatewayMock.getRegisters.mockRejectedValue(error);
    getRegisters.execute().catch((err) => expect(err).toEqual(error));
  });
});
