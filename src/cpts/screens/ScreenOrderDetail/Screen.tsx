import React from 'react';
import useViewModel from './view.model';
import { InfoLine } from './cpts/infoLine';

export type OrderDetailProps = {
  orderId: string;
  productName: string;
  realMoney: number;
  verifyTime: string;
  phone: string;
  carNumber?: string; // 车牌号
};

export default (props: OrderDetailProps) => {
  const {
    realMoney,
    orderId,
    phone,
    productName,
    verifyTime,
    carNumber,
  } = props;
  const { businessManager } = useViewModel();
  const newPhone = phone.replace(/^(\d{3})\d+(\d{4})$/, '$1****$2');
  return (
    <div className={'screen-order-detail'}>
      <div className={'order-detail-card'}>
        <div className={'top-banner'}>
          <p className={'header-title'}>￥{realMoney}</p>
          <div className={'status-bar'}>已完成</div>
        </div>
        <InfoLine title="服务名称" content={productName} />
        <InfoLine title="订单编号" content={orderId} copy />
        <InfoLine title="手机号码" content={newPhone} />
        <InfoLine title="完成时间" content={verifyTime} />
        {carNumber && <InfoLine title="车牌号码" content={carNumber} />}
        <div className={'customer-service'}>
          <p className={'tips'}>如果您对订单有疑问，请联系客服</p>
          <div className={'call-phone'} onClick={businessManager}>
            联系客服
          </div>
        </div>
      </div>
    </div>
  );
};
