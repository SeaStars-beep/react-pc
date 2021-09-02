import { makeIO } from '@src/services/meta';
import { Order, OrderRes } from '@src/entites';

export const get = makeIO<Order, OrderRes>(
  'get',
  'oil/api/v1/h5/store/order/list',
  () => null,
);
