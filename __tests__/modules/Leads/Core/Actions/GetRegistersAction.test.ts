import { describe, beforeEach, expect, test } from "vitest";
import { leadsGatewayMock } from "../../mocks";
import {
  GetRegistersAction,
  IGetRegistersAction,
} from "../../../../../src/modules/Leads/core/actions/GetRegistersAction";
import { GET_REGISTERS_RESPONSE } from "../../responseExamples";

describe("GetRegistersAction", () => {
  let getRegisters: IGetRegistersAction;

  beforeEach(() => {
    getRegisters = GetRegistersAction(leadsGatewayMock);
  });

  test("Call LeadsGateway when GetRegistersAction is executed", async () => {
    leadsGatewayMock.getRegisters.mockResolvedValue(GET_REGISTERS_RESPONSE.registers);
    await getRegisters.execute();
    expect(leadsGatewayMock.getRegisters).toHaveBeenCalled();
  });

  test("GetRegistersAction returns the LeadsGateway response", async () => {
    leadsGatewayMock.getRegisters.mockResolvedValue(GET_REGISTERS_RESPONSE.registers);
    const result = await getRegisters.execute();
    expect(result).toEqual(GET_REGISTERS_RESPONSE.registers);
  });

  test("When GetRegistersAction execution fails, catch the error and return it", async () => {
    const error = new Error("Error");
    leadsGatewayMock.getRegisters.mockRejectedValue(error);
    getRegisters.execute().catch((err) => expect(err).toEqual(error));
  });
});
