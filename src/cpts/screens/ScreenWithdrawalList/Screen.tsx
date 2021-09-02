import React from 'react';
import { useErrorBoundary } from 'use-error-boundary';
import useViewModel from './view.model';
import Tabs from './cpts/Tabs';
import Record from './cpts/RecordItem';

export interface Props {
  status?: number;
}

export default (props: Props) => {
  const {
    products,
    curTab,
    handleTabChange,
    naviToScreenBankInfo,
    TABS,
  } = useViewModel(props);
  const { ErrorBoundary, didCatch } = useErrorBoundary();

  return (
    <div className={'screen-withdrawal-list'}>
      <Tabs activeKey={curTab} data={TABS} callback={handleTabChange} />
      <div className={'withdrawl-other-wrap'}>
        <span>如果打款失败请核对收款信息是否正确，</span>
        <span onClick={naviToScreenBankInfo}>点击核对 {'>'}</span>
      </div>
      {didCatch ? (
        <p>提现记录信息错误，请核对收款信息</p>
      ) : (
        <ErrorBoundary>
          <div className={'content-wrap'}>
            <div className={'content-list'}>
              {products?.length > 0 &&
                products?.map((item, index) => (
                  <Record
                    key={`${JSON.stringify(item)}_${index}`}
                    data={item}
                  />
                ))}
              {products?.length === 0 && '暂无数据'}
            </div>
          </div>
        </ErrorBoundary>
      )}
    </div>
  );
};
