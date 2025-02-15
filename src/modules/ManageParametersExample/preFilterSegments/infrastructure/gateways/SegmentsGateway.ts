import { HttpResponse, IHttpClient } from "../../../../httpClient/interfaces";
import { apis } from "../../../../../constants/api";
import { ISegmentsGateway } from "../../core/gateways/ISegmentsGateway";
import IPreFilterSegment from "../../core/entities/IPreFilterSegment";

export const SegmentsGateway = (httpClient: IHttpClient): ISegmentsGateway => {
  return {
    async getSegments() {
      try {
        const response = await httpClient.get(apis.parameters.segments);
        if (!response.status) {
          return Promise.reject(response.error);
        }
        return Promise.resolve(mapResponseToGetSegments(response));
      } catch (error) {
        return Promise.reject(responseError(error));
      }
    },
    async editSegment(params) {
      try {
        const { body, id } = params;
        const requestBody = mapEditSegmentRequestBody(body);
        const response = await httpClient.patch(
          `${apis.parameters.segments}/${id}`,
          requestBody
        );
        if (!response.status) {
          return Promise.reject(response.error);
        }
        return Promise.resolve(response.data);
      } catch (error) {
        return Promise.reject(responseError(error));
      }
    },
  };
};

const responseError = (error: HttpResponse): string => {

  if (!error.error) {
    return "undefined";
  }

  return error.error?.message;
};

const mapResponseToGetSegments = (
  response: HttpResponse
) => {
  return response.data.map((segmentRes) => ({
    id: segmentRes.id,
    segment: segmentRes.segment,
    overdueDaysTC: segmentRes.days_late_tc,
    overdueDaysPP: segmentRes.days_late_pp,
    globalMaxAmount: segmentRes.global_max_amount,
    maxTransactionAmount: segmentRes.max_transaction_amount,
    affectation: segmentRes.affectation,
    globalIndebtedness: segmentRes.global_indebtedness,
  }));
};

const mapEditSegmentRequestBody = (body: Partial<IPreFilterSegment>) => {
  return {
    days_late_tc: body.overdueDaysTC,
    days_late_pp: body.overdueDaysPP,
    global_max_amount: body.globalMaxAmount,
    max_transaction_amount: body.maxTransactionAmount,
    affectation: body.affectation,
    global_indebtedness: body.globalIndebtedness,
  };
};