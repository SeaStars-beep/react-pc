import { makeIO, SearchRet } from '@src/services/meta';
import { Product, PageSorts, ProductStatus } from '@src/entites';

export const get = makeIO<
  {
    pageIndex: number;
    pageSorts?: PageSorts;
    storeNo: string;
    pageSize: number;
    categoryId?: number;
    status?: ProductStatus;
  },
  SearchRet<Product>
>('post', '/api/v1/h5/store/product/list');
