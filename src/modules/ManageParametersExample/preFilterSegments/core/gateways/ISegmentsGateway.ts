import { HttpResponse } from '../../../../httpClient/interfaces';
import { IEditSegmentParams } from '../entities/IPreFilterSegment';

export interface ISegmentsGateway {
  getSegments: () => Promise<HttpResponse>;
  editSegment: (params: IEditSegmentParams) => Promise<HttpResponse>;
}
