import { makeIO } from '@src/services/meta';

export const login = makeIO<
  { phone: string; password: string },
  { token: string }
>('post', '/api/v1/h5/store/login');

export const logout = makeIO<never>('post', '/api/v1/h5/store/logout');
