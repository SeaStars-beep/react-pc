import { makeIO } from '@src/services/meta';

export const putPassword = makeIO<{
  phone: string;
  oldPassword: string;
  newPassword: string;
}>('put', '/api/v1/h5/store/admin/password');
