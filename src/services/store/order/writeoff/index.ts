import { makeIO } from '@src/services/meta';

export const writeOff = makeIO<
  { storeId: number; verificationCode: string; picUrl?: string },
  {
    phone: string;
    productName: string;
    orderId: string;
    storePhone: string;
    verifyTime: string;
    carNumber?: string;
    verificationStatusName: string;
    supplierPrice: number;
  }
>('post', '/api/v1/h5/store/order/writeoff');
