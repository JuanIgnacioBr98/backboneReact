import { beforeEach, describe, expect, test } from "vitest";
import { SavePipeAction, ISavePipeAction } from "../../../../../../src/modules/ManageParameters/preFilterPipes/core/actions/SavePipeAction";
import { GET_PIPES_RESPONSE, PIPES_RESPONSE, pipesGatewayMock, savePipeParamsMock } from "../../../mocks";
import IPreFilterPipe from "../../../../../../src/modules/ManageParameters/preFilterPipes/core/entities/IPreFilterPipe";

describe("SavePipeAction", () => {
  let savePipe: ISavePipeAction;

  beforeEach(() => {
    savePipe = SavePipeAction(pipesGatewayMock);
  });

  test("Call PipesGateway when GetRegistersAction is executed", async () => {
    pipesGatewayMock.savePipe.mockResolvedValue(PIPES_RESPONSE);
    await savePipe.execute(savePipeParamsMock as Partial<IPreFilterPipe>);
    expect(pipesGatewayMock.savePipe).toHaveBeenCalled();
  });

  test("SavePipeAction returns the PipesGateway response", async () => {
    pipesGatewayMock.savePipe.mockResolvedValue(GET_PIPES_RESPONSE);
    const result = await savePipe.execute(savePipeParamsMock as Partial<IPreFilterPipe>);
    expect(result).toEqual(GET_PIPES_RESPONSE);
  });

  test("When SavePipeAction execution fails, catch the error and return it", async () => {
    const error = new Error("Error");
    pipesGatewayMock.savePipe.mockRejectedValue(error);
    savePipe.execute(savePipeParamsMock as Partial<IPreFilterPipe>).catch((err) => expect(err).toEqual(error));
  });
});
