import { makeIO } from '@src/services/meta';
import { Product } from '@src/entites';

export const post = makeIO<Product, never>('post', '/api/v1/h5/store/product');

export const put = makeIO<Product, never>('put', '/api/v1/h5/store/product');

export const del = makeIO<{ id: string }, never>(
  'delete',
  (params) => `/api/v1/h5/store/product/${params.id}`,
  () => null,
);

export const get = makeIO<{ id: string }, Product>(
  'get',
  (params) => `/api/v1/h5/store/product/${params.id}`,
  () => null,
);
