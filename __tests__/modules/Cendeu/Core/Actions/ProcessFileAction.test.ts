import { describe, beforeEach, expect, test } from "vitest";
import { cendeuGatewayMock, fileMock } from "../../mocks";
import {
  IProcessFileAction,
  ProcessFileAction,
} from "../../../../../src/modules/Cendeu/core/actions/ProcessFileAction";
import { PROCESS_FILE_RESPONSE } from "../../responseExamples";

describe("ProcessFileAction", () => {
  let processFileAction: IProcessFileAction;

  beforeEach(() => {
    processFileAction = ProcessFileAction(cendeuGatewayMock);
  });

  test("Call CendeuGateway when ProcessFileAction is executed", async () => {
    cendeuGatewayMock.processFile.mockResolvedValue(PROCESS_FILE_RESPONSE);
    await processFileAction.execute(fileMock);
    expect(cendeuGatewayMock.processFile).toHaveBeenCalled();
  });

  test("ProcessFileAction returns the CendeuGateway response", async () => {
    cendeuGatewayMock.processFile.mockResolvedValue(PROCESS_FILE_RESPONSE);
    const result = await processFileAction.execute(fileMock);
    expect(result).toEqual(PROCESS_FILE_RESPONSE);
  });

  test("When ProcessFileAction execution fails, catch the error and return it", async () => {
    const error = new Error("Error");
    cendeuGatewayMock.processFile.mockRejectedValue(error);
    processFileAction.execute(fileMock).catch((err) => expect(err).toEqual(error));
  });
});
