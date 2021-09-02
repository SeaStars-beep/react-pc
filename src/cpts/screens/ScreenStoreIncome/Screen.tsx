import './style.styl';

import React from 'react';
import useViewModel from './view.model';
import { List } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

export const Screen = () => {
  const { storeIncomeList } = useViewModel();
  return (
    <div className={'screen-all-order-list'}>
      {storeIncomeList &&
        storeIncomeList.map((it, index) => (
          <List className="screenAllOrders-list" key={index}>
            <Item
              extra={'￥' + it.settlementAmount}
              className="item"
              multipleLine
            >
              {it.settlementDate + ' ' + it.settlementMethodName}
              <Brief>{it.settlementPayedTime + '到账'}</Brief>
            </Item>
          </List>
        ))}
    </div>
  );
};
