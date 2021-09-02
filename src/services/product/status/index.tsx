import { makeIO } from '@src/services/meta';

export const put = makeIO<{ id: string; status: number }, never>(
  'put',
  '/api/v1/h5/store/product/status',
);
