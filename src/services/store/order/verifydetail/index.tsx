import { makeIO, SearchRet } from '@src/services/meta';
import { VerifyDetailRes, VerifydetailDateType, PayStatus } from '@src/entites';

export interface verifydetailParams {
  dateType?: VerifydetailDateType;
  endTime?: string;
  orderStatus?: PayStatus;
  pageIndex: number;
  pageSize: number;
  startTime?: string;
  verifyTime?: string;
}
export const get = makeIO<verifydetailParams, SearchRet<VerifyDetailRes>>(
  'get',
  (params) =>
    `/api/v1/h5/store/order/verifydetail?${new URLSearchParams(params as any)}`,
  () => null,
);
