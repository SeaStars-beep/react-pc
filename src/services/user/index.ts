import { makeIO } from '@src/services/meta';
import { User } from '@src/entites';

export const get = makeIO<never, User>('get', '/api/v1/h5/store/user');
