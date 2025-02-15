import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAgeActionErrorMock, mockAgesData } from "../../../mocks";
import { IAgesGateway } from "../../../../../../src/modules/ManageParameters/preFilterAge/core/gateways/IAgesGateway";
import { GetAgesAction, IGetAgesAction } from "../../../../../../src/modules/ManageParameters/preFilterAge/core/actions/GetAgesAction";

describe("GetAgesAction", () => {
  let agesGateway: IAgesGateway;
  let getAgesAction: IGetAgesAction;

  beforeEach(() => {
    agesGateway = {
      getAges: vi.fn(),
      editAge: vi.fn()
    };

    getAgesAction = GetAgesAction(agesGateway);
  });

  it("should resolve with ages data when getAges succeeds", async () => {
    (agesGateway.getAges as vi.Mock).mockResolvedValue(mockAgesData);

    await expect(getAgesAction.execute()).resolves.toEqual(mockAgesData);
  });

  it("should reject with an error when getAges fails", async () => {
    (agesGateway.getAges as vi.Mock).mockRejectedValue(getAgeActionErrorMock.error);

    await expect(getAgesAction.execute()).rejects.toThrow(
      "Failed to fetch ages"
    );
  });
});
