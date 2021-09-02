import { makeIO, SearchRet } from '@src/services/meta';
import { PicDto, Category } from '@src/entites/index';
export { PicDto, Category };

export const get = makeIO<void, never>('get', '/api/v1/h5/store/bank');

export const postPic = makeIO<PicDto[], any>(
  'post',
  '/api/v1/h5/store/picture/update',
);
