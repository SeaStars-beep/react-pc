import { makeIO, SearchRetAnother } from '@src/services/meta';
import { StoreIncome } from '@src/entites';

// export const put = makeIO<Store, never>('put', '/api/v1/h5/store');

export const get = makeIO<
  {
    id: string;
    pageNum?: number;
    pageSize?: number;
  },
  SearchRetAnother<StoreIncome>
>(
  'get',
  (params) =>
    `/api/v1/h5/store/income/${params.id}/${params.pageNum}/${params.pageSize}`,
);
