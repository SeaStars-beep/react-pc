import React from 'react';
import useViewModel from './view.model';
import { IconF } from '@src/common-cpts/IconF';
import { IconFont } from '@src/common-cpts/IconF/meta';
import { useErrorBoundary } from 'use-error-boundary';

export default () => {
  const { ErrorBoundary, didCatch, error, reset } = useErrorBoundary();
  const { naviToScreenOrdersInMonth, ordersInfo } = useViewModel();
  return (
    <>
      {didCatch ? (
        <div>请将当前错误截图给产品经理： {error.message}</div>
      ) : (
        <ErrorBoundary>
          <div className={'screen-all-orders'}>
            {ordersInfo &&
              ordersInfo.map((item, index) => (
                <div
                  className={'all-orders-list-item'}
                  onClick={naviToScreenOrdersInMonth(item)}
                  key={index}
                >
                  <div className={'list-item-lf'}>{item.verifyTime}</div>
                  <div className={'list-item-rg'}>
                    <span>{item.num}笔</span>
                    <div className={'item-rg-main'}>
                      <span>￥{item.money}</span>
                      <IconF type={IconFont.ArrowRight} />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </ErrorBoundary>
      )}
    </>
  );
};
