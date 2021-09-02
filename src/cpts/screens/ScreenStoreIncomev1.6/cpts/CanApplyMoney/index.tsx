import React from 'react';
import { useErrorBoundary } from 'use-error-boundary';
import { CashapplyParams } from '@src/services/store';

export type Props = {
  cashapply: CashapplyParams;
  getCash: any;
};

export default (prop: Props) => {
  const { ErrorBoundary, didCatch, error, reset } = useErrorBoundary();
  const { cashapply, getCash } = prop;
  return (
    <>
      {didCatch ? (
        <p>请将当前错误截图给产品经理: {error.message}</p>
      ) : (
        <ErrorBoundary>
          <div className={'header'}>
            <div className={'header-left'}>
              <div className={'fz13 color334 fw400'}>可提现收入</div>
              <div style={{ marginTop: 10 }} className={'fz26 color030 fw600'}>
                <span className={'fz13 fw600 mr2'}>¥</span>
                {cashapply?.canApplyMoney}
              </div>
            </div>
            <div className={'header-right'} onClick={getCash}>
              立即提现
            </div>
          </div>
        </ErrorBoundary>
      )}
    </>
  );
};
