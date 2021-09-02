import { makeIO, SearchRet } from '@src/services/meta';
import { ProductCategory, PageSorts } from '@src/entites';

export const post = makeIO<
  {
    pageIndex: number;
    pageSorts?: PageSorts;
    pageSize: number;
    keyword?: string;
  },
  SearchRet<ProductCategory>
>('post', 'api/v1/h5/store/product/category/getList');
