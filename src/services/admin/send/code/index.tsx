import { makeIO } from '@src/services/meta';

export const sendCode = makeIO<{
  mobile: string;
  scene: string;
}>('post', '/api/v1/h5/store/admin/send/code');
