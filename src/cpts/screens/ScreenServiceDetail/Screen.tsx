import React from 'react';
import useViewModel from './view.model';
import { Tag } from 'antd-mobile';

interface propsValue {
  id: string;
}

export default (props: propsValue) => {
  const { product } = useViewModel({ id: props.id });
  const {
    name = '',
    supplierPrice = '',
    linePrice = '',
    salePrice = '',
    description = '',
    categoryName = '',
  } = product ?? {};
  return (
    <div className={'screen-service-detail'}>
      {
        <div className={'service-detail-main'}>
          <div className={'item-label'}>服务类型</div>
          <div className={'item-content'}>
            <Tag selected>{categoryName}</Tag>
          </div>
          <div className={'item-label'}>服务名称</div>
          <div className={'item-content-title'}>{name}</div>
          <div className={'item-label'}>服务价格（元）</div>
          <div className={'item-content'}>
            <p className={'item-content-title'}>
              <strong>结算价</strong>
              <span>{supplierPrice}</span>
            </p>
            <p className={'item-content-title'}>
              <strong>原价</strong>
              <span className={'span-mid'}>{linePrice}</span>
            </p>
            <p className={'item-content-title'}>
              <strong>会员价</strong>
              <span>{salePrice}</span>
            </p>
          </div>
          <div className={'item-label'}>服务说明</div>
          <div className={'item-content-des'}>{description}</div>
        </div>
      }
    </div>
  );
};
