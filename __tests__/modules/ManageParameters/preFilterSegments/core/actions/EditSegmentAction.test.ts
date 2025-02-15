import { describe, it, expect } from 'vitest';
import { actionBodyMock, actionIdMock, actionSegmentBodyMock, actionSegmentIdMock, editSegmentParamsMock, segmentsGatewayFailedMock, segmentsGatewaysuccessMock } from '../../../mocks';
import { EditSegmentAction, IEditSegmentAction } from '../../../../../../src/modules/ManageParameters/preFilterSegments/core/actions/EditSegmentAction';

describe('EditSegmentAction', () => {
  it('should call editSegment with correct parameters and return result on success', async () => {

    const action: IEditSegmentAction = EditSegmentAction(segmentsGatewaysuccessMock);

    const result = await action.execute(actionSegmentBodyMock, actionSegmentIdMock);

    expect(segmentsGatewaysuccessMock.editSegment).toHaveBeenCalledWith(editSegmentParamsMock);
    expect(result).toEqual({ success: true });
  });

  it('should throw an error when editSegment fails', async () => {

    const action: IEditSegmentAction = EditSegmentAction(segmentsGatewayFailedMock);

    await expect(action.execute(actionBodyMock, actionIdMock)).rejects.toThrow('Failed to edit segment');
  });
});
