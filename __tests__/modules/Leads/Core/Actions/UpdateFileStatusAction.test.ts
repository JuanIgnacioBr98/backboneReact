import { describe, beforeEach, expect, test } from "vitest";
import {
  IUpdateFileStatusAction,
  UpdateFileStatusAction,
} from "../../../../../src/modules/Leads/core/actions/UpdateFileStatusAction";
import { updateFileStatusGateway, fileName } from "../../mocks";

describe("Update file status action", () => {
  let updateFileStatusAction: IUpdateFileStatusAction;

  beforeEach(() => {
    updateFileStatusAction = UpdateFileStatusAction(updateFileStatusGateway);
  });

  test("when execute the action call the gateway", async () => {
    updateFileStatusGateway.updateStatus.mockResolvedValue(true);
    await updateFileStatusAction.execute(fileName, true);
    expect(updateFileStatusGateway.updateStatus).toHaveBeenCalledWith(fileName, true);
  });

  test("when execute the action wrongly, catch the error and return it", () => {
    const error = new Error("error");
    updateFileStatusGateway.updateStatus.mockRejectedValue(error);
    updateFileStatusAction
      .execute(fileName, true)
      .catch((err) => expect(err).toEqual(error));
  });
});
