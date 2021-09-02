import { makeIO } from '@src/services/meta';
import { VerifyRes } from '@src/entites';

export const get = makeIO<{ storeId: number }, Array<VerifyRes>>(
  'get',
  (params) =>
    `/api/v1/h5/store/order/verifylist?${new URLSearchParams(params as any)}`,
  () => null,
);
