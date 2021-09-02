import { makeIO, rawIO } from '@src/services/meta';
import { Store, Province, cardTypeStatus } from '@src/entites';

export const put = makeIO<Store, never>('put', '/api/v1/h5/store');

export const get = makeIO<{ supplierStoreId: number }, Store>(
  'get',
  (params) => `/api/v1/h5/store/${params.supplierStoreId}`,
  () => null,
);

export const getProvince = makeIO<never, Province>(
  'get',
  '/api/v1/admin/province',
);

export const getCity = makeIO<{ provinceCode: string }, Province>(
  'get',
  (params) => `/api/v1/admin/city/${params.provinceCode}`,
);

export const getArea = makeIO<{ cityCode: string }, Province>(
  'get',
  (params) => `/api/v1/admin/area/${params.cityCode}`,
);

export const postUpload = (file: FormData) =>
  rawIO.post('/api/v1/amdin/upload', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export interface CashapplyParams {
  applyEdMoney: number;
  applyFailMoney: number;
  applyingMoney: number;
  canApplyMoney?: number;
}

export const getCashapply = makeIO<never, CashapplyParams>(
  'get',
  (params) => '/api/v1/h5/cashapply',
  () => null,
);

export interface CashApplyInfo {
  bankName: string;
  accountName: string;
  branchBankName: string;
  cardType: cardTypeStatus;
  accountNo: string;
  storePhone: string;
  canApplyMoney: number;
  status: number; //0-不需要补充 1-需要补充
}

export const getCashApplyInfo = makeIO<{ money: number }, CashApplyInfo>(
  'get',
  (params) => `/api/v1/h5/cashapply/cashApply/${params.money}`,
  () => null,
);
