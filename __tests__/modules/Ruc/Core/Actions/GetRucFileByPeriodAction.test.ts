import { addMonths, format } from "date-fns";
import { describe, beforeEach, expect, test } from "vitest";
import { getRucFileByPeriodGateway } from "../../mocks";
import {
  GetRucFileByPeriodAction,
  IGetRucFileByPeriodAction,
} from "../../../../../src/modules/Ruc/core/actions/GetRucFileByPeriodAction";

describe("get ruc file by period action", () => {
  const dateExample = format(addMonths(new Date(), 1), "dd/MM/yyyy");
  let getRucFileByPeriodAction: IGetRucFileByPeriodAction;

  beforeEach(() => {
    getRucFileByPeriodAction = GetRucFileByPeriodAction(
      getRucFileByPeriodGateway
    );
  });

  test("when execute the action then call the gateway", async () => {
    getRucFileByPeriodGateway.getRucFile.mockResolvedValue("");
    await getRucFileByPeriodAction.execute(dateExample);
    expect(getRucFileByPeriodGateway.getRucFile).toHaveBeenCalled();
  });

  test("catch the error and return it when action is executed wrongly", async () => {
    const error = new Error("error");
    getRucFileByPeriodGateway.getRucFile.mockRejectedValue(error);
    getRucFileByPeriodAction
      .execute(dateExample)
      .catch((err) => expect(err).toEqual(error));
    expect(getRucFileByPeriodGateway.getRucFile).toHaveBeenCalled();
  });
});
