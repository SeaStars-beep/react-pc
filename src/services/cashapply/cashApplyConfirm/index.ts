import { makeIO } from '@src/services/meta';

export const post = makeIO<{
  phone?: string;
  type?: number;
  code?: string;
}>('post', '/api/v1/h5/cashapply/cashApplyConfirm');
