import { beforeEach, describe, expect, test } from "vitest";
import { GetPipesAction, IGetPipesAction } from "../../../../../../src/modules/ManageParameters/preFilterPipes/core/actions/GetPipesAction";
import { GET_PIPES_RESPONSE, pipesGatewayMock } from "../../../mocks";

describe("GetPipesAction", () => {
  let getPipes: IGetPipesAction;

  beforeEach(() => {
    getPipes = GetPipesAction(pipesGatewayMock);
  });

  test("Call PipesGateway when GetRegistersAction is executed", async () => {
    pipesGatewayMock.getPipes.mockResolvedValue(GET_PIPES_RESPONSE);
    await getPipes.execute();
    expect(pipesGatewayMock.getPipes).toHaveBeenCalled();
  });

  test("GetPipesAction returns the PipesGateway response", async () => {
    pipesGatewayMock.getPipes.mockResolvedValue(GET_PIPES_RESPONSE);
    const result = await getPipes.execute();
    expect(result).toEqual(GET_PIPES_RESPONSE);
  });

  test("When GetPipesAction execution fails, catch the error and return it", async () => {
    const error = new Error("Error");
    pipesGatewayMock.getPipes.mockRejectedValue(error);
    getPipes.execute().catch((err) => expect(err).toEqual(error));
  });
});
