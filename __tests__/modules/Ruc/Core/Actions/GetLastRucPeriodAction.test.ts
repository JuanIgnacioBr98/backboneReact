import { describe, beforeEach, expect, test } from "vitest";
import { GET_LAST_PERIODS_RESPONSE, rucGatewayMock } from "../../mocks";
import { GetLastPeriodsAction, IGetLastPeriodsAction } from "../../../../../src/modules/Ruc/core/actions/GetLastPeriodsAction";

describe("GetLastPeriodsAction", () => {
  let getLastPeriods: IGetLastPeriodsAction;

  beforeEach(() => {
    getLastPeriods = GetLastPeriodsAction(rucGatewayMock);
  });

  test("Call rucGateway when GetLastPeriodsAction is executed", async () => {
    rucGatewayMock.getLastPeriods.mockResolvedValue(GET_LAST_PERIODS_RESPONSE);
    await getLastPeriods.execute();
    expect(rucGatewayMock.getLastPeriods).toHaveBeenCalled();
  });

  test("GetLastPeriodsAction returns the rucGateway response", async () => {
    rucGatewayMock.getLastPeriods.mockResolvedValue(GET_LAST_PERIODS_RESPONSE);
    const result = await getLastPeriods.execute();
    expect(result).toEqual(GET_LAST_PERIODS_RESPONSE);
  });

  test("When GetLastPeriodsAction execution fails, catch the error and return it", async () => {
    const error = new Error("Error");
    rucGatewayMock.getLastPeriods.mockRejectedValue(error);
    getLastPeriods.execute().catch((err) => expect(err).toEqual(error));
  });
});
