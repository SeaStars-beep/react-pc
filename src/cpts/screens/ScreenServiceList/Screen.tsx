import React from 'react';
import useViewModel from './view.model';
import { Tabs, List, Button } from 'antd-mobile';

export default () => {
  const {
    naviToScreenServiceDetail,
    products,
    onSaleProducts,
    notForSaleProducts,
    businessManager,
  } = useViewModel();
  const tabs = [{ title: '全部' }, { title: '已上架' }, { title: '未上架' }];

  // console.log(products);

  const Item = List.Item;
  const Brief = Item.Brief;
  return (
    <div className={'screen-service-list'}>
      <Tabs tabs={tabs} initialPage={0} animated={false}>
        <div className={'service-list-tabtcontent'}>
          <List className="my-list">
            {products.map((item) => (
              <Item
                multipleLine
                extra={item.status ? '已上架' : '未上架'}
                arrow="horizontal"
                className={'tab-content-item'}
                onClick={() => naviToScreenServiceDetail(item.id)}
                key={item.id}
              >
                {item.name}
                <Brief>
                  原价￥{item.linePrice} 会员价￥{item.salePrice}
                </Brief>
              </Item>
            ))}
          </List>
        </div>
        <div className={'service-list-tabtcontent'}>
          <List className="my-list">
            {onSaleProducts.map((item: any) => (
              <Item
                multipleLine
                extra={item.status ? '已上架' : '未上架'}
                arrow="horizontal"
                className={'tab-content-item'}
                onClick={() => naviToScreenServiceDetail(item.id)}
                key={item.id}
              >
                {item.name}
                <Brief>
                  原价￥{item.linePrice} 会员价￥{item.salePrice}
                </Brief>
              </Item>
            ))}
          </List>
        </div>
        <div className={'service-list-tabtcontent'}>
          <List className="my-list">
            {notForSaleProducts.map((item: any) => (
              <Item
                multipleLine
                extra={item.status ? '已上架' : '未上架'}
                arrow="horizontal"
                className={'tab-content-item'}
                onClick={() => naviToScreenServiceDetail(item.id)}
                key={item.id}
              >
                {item.name}
                <Brief>
                  原价￥{item.linePrice} 会员价￥{item.salePrice}
                </Brief>
              </Item>
            ))}
          </List>
        </div>
      </Tabs>
      <Button
        type="primary"
        className={'screen-service-btn'}
        onClick={businessManager}
      >
        +新增服务
      </Button>
    </div>
  );
};
