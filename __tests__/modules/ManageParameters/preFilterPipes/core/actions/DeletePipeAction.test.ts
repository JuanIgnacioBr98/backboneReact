import { beforeEach, describe, expect, test } from "vitest";
import { DeletePipeAction, IDeletePipeAction } from "../../../../../../src/modules/ManageParameters/preFilterPipes/core/actions/DeletePipeAction";
import { GET_PIPES_RESPONSE, PIPES_RESPONSE, pipesGatewayMock } from "../../../mocks";

describe("DeletePipeAction", () => {
  let deletePipe: IDeletePipeAction;

  beforeEach(() => {
    deletePipe = DeletePipeAction(pipesGatewayMock);
  });

  test("Call PipesGateway when GetRegistersAction is executed", async () => {
    pipesGatewayMock.deletePipe.mockResolvedValue(PIPES_RESPONSE);
    await deletePipe.execute("24");
    expect(pipesGatewayMock.deletePipe).toHaveBeenCalled();
  });

  test("DeletePipeAction returns the PipesGateway response", async () => {
    pipesGatewayMock.deletePipe.mockResolvedValue(GET_PIPES_RESPONSE);
    const result = await deletePipe.execute("24");
    expect(result).toEqual(GET_PIPES_RESPONSE);
  });

  test("When DeletePipeAction execution fails, catch the error and return it", async () => {
    const error = new Error("Error");
    pipesGatewayMock.deletePipe.mockRejectedValue(error);
    deletePipe.execute("24").catch((err) => expect(err).toEqual(error));
  });
});
