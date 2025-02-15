import { describe, beforeEach, expect, test } from "vitest";
import { leadsGatewayMock, fileMock } from "../../mocks";
import { IProcessFileAction, ProcessFileAction } from "../../../../../src/modules/Leads/core/actions/ProcessFileAction";
import { PROCESS_FILE_RESPONSE } from "../../responseExamples";

describe("ProcessFileAction", () => {
  let processFileAction: IProcessFileAction;

  beforeEach(() => {
    processFileAction = ProcessFileAction(leadsGatewayMock);
  });

  test("Call LeadsGateway when ProcessFileAction is executed", async () => {
    leadsGatewayMock.processFile.mockResolvedValue(PROCESS_FILE_RESPONSE);
    await processFileAction.execute(fileMock);
    expect(leadsGatewayMock.processFile).toHaveBeenCalled();
  });

  test("ProcessFileAction returns the LeadsGateway response", async () => {
    leadsGatewayMock.processFile.mockResolvedValue(PROCESS_FILE_RESPONSE);
    const result = await processFileAction.execute(fileMock);
    expect(result).toEqual(PROCESS_FILE_RESPONSE);
  });

  test("When ProcessFileAction execution fails, catch the error and return it", async () => {
    const error = new Error("Error");
    leadsGatewayMock.processFile.mockRejectedValue(error);
    processFileAction.execute(fileMock).catch((err) => expect(err).toEqual(error));
  });
});
