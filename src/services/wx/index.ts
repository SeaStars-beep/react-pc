import { makeIO } from '@src/services/meta';
import { makePublicParams } from '@src/services/meta';

export const get = makeIO<
  { url: string },
  { appId: string; nonceStr: string; signature: string; timestamp: null }
>(
  'get',
  (params) => {
    const reg = makePublicParams('/api/v1/customer/wx/jsconfig');
    return `/oil/api/v1/customer/wx/jsconfig?${new URLSearchParams({
      ...params,
      ...reg,
    })}`;
  },
  () => null,
);
