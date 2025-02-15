import { beforeEach, describe, expect, test } from "vitest";
import { EditPipeAction, IEditPipeAction } from "../../../../../../src/modules/ManageParameters/preFilterPipes/core/actions/EditPipeAction";
import { GET_PIPES_RESPONSE, PIPES_RESPONSE, pipesGatewayMock, editPipeParamsMock } from "../../../mocks";
import IPreFilterPipe from "../../../../../../src/modules/ManageParameters/preFilterPipes/core/entities/IPreFilterPipe";

describe("EditPipeAction", () => {
  let editPipe: IEditPipeAction;

  beforeEach(() => {
    editPipe = EditPipeAction(pipesGatewayMock);
  });

  test("Call PipesGateway when GetRegistersAction is executed", async () => {
    pipesGatewayMock.editPipe.mockResolvedValue(PIPES_RESPONSE);
    await editPipe.execute(editPipeParamsMock as Partial<IPreFilterPipe>,"24");
    expect(pipesGatewayMock.editPipe).toHaveBeenCalled();
  });

  test("EditPipeAction returns the PipesGateway response", async () => {
    pipesGatewayMock.editPipe.mockResolvedValue(GET_PIPES_RESPONSE);
    const result = await editPipe.execute(editPipeParamsMock as Partial<IPreFilterPipe>, "24");
    expect(result).toEqual(GET_PIPES_RESPONSE);
  });

  test("When EditPipeAction execution fails, catch the error and return it", async () => {
    const error = new Error("Error");
    pipesGatewayMock.editPipe.mockRejectedValue(error);
    editPipe.execute(editPipeParamsMock as Partial<IPreFilterPipe>,"24").catch((err) => expect(err).toEqual(error));
  });
});
