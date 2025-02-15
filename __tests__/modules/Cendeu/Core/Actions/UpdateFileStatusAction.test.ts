import { describe, beforeEach, expect, test } from "vitest";
import {
  IUpdateFileStatusAction,
  UpdateFileStatusAction,
} from "../../../../../src/modules/Cendeu/core/actions/UpdateFileStatusAction";
import { updateFileStatusGatewayMock, fileName } from "../../mocks";

describe("Update file status action", () => {
  let updateFileStatusAction: IUpdateFileStatusAction;

  beforeEach(() => {
    updateFileStatusAction = UpdateFileStatusAction(
      updateFileStatusGatewayMock
    );
  });

  test("when execute the action call the gateway", async () => {
    updateFileStatusGatewayMock.updateStatus.mockResolvedValue(true);
    await updateFileStatusAction.execute(fileName, true);
    expect(updateFileStatusGatewayMock.updateStatus).toHaveBeenCalledWith(
      fileName,
      true
    );
  });

  test("when execute the action wrongly, catch the error and return it", () => {
    const error = new Error("error");
    updateFileStatusGatewayMock.updateStatus.mockRejectedValue(error);
    updateFileStatusAction
      .execute(fileName, true)
      .catch((err) => expect(err).toEqual(error));
  });
});
