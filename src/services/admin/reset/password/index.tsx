import { makeIO } from '@src/services/meta';

export const resetPassword = makeIO<{
  loginAccount: string;
  mobile: string;
  newPassword: string;
  confirmPassword: string;
  verCode: string;
}>('put', '/api/v1/h5/store/admin/reset/password');
