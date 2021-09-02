import { makeIO, SearchRet } from '@src/services/meta';
import { WithdrawalRecord, PageSorts, ApplyStatus } from '@src/entites';

export { WithdrawalRecord, ApplyStatus };

export const get = makeIO<
  {
    pageIndex: number;
    pageSorts?: PageSorts;
    pageSize: number;
    keyword?: string;
    applyStatus?: ApplyStatus;
  },
  SearchRet<WithdrawalRecord>
>('post', '/api/v1/h5/cashapply/pagelist');
