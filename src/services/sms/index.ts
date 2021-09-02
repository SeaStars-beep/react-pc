import { makeIO } from '@src/services/meta';

export const sendCode = makeIO<{
  phone?: string;
  type?: number;
}>('post', '/api/v1/sms/sendcode');
