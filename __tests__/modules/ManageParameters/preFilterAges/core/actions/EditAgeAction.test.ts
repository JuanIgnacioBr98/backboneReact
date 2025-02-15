import { describe, it, expect } from 'vitest';
import { actionBodyMock, actionIdMock, agesGatewayFailedMock, agesGatewaysuccessMock } from '../../../mocks';
import { EditAgeAction, IEditAgeAction } from '../../../../../../src/modules/ManageParameters/preFilterAge/core/actions/EditAgeAction';

const actionSuccess: IEditAgeAction = EditAgeAction(agesGatewaysuccessMock);
const actionFailed: IEditAgeAction = EditAgeAction(agesGatewayFailedMock);

describe('EditAgeAction', () => {
  it('should call editAge with correct parameters and return result on success', async () => {

    const result = await actionSuccess.execute(actionBodyMock, actionIdMock);

    expect(agesGatewaysuccessMock.editAge).toHaveBeenCalledWith({ body: actionBodyMock, id: actionIdMock });
    expect(result).toEqual({ success: true });
  });

  it('should throw an error when editAge fails', async () => {

    await expect(actionFailed.execute(actionBodyMock, actionIdMock)).rejects.toThrow('Failed to edit age');
  });
});
