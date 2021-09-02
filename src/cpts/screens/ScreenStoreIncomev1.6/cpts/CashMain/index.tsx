import React from 'react';
import { useErrorBoundary } from 'use-error-boundary';
import { CashapplyParams } from '@src/services/store';
import rightPNG from '@assets/images/right.png';

export type Props = {
  cashapply: CashapplyParams;
  getCheckFail: any;
  naviToScreenBankInfo: any;
};

export default (prop: Props) => {
  const { ErrorBoundary, didCatch, error, reset } = useErrorBoundary();
  const { cashapply, getCheckFail, naviToScreenBankInfo } = prop;
  return (
    <>
      {didCatch ? (
        <p>请将当前错误截图给产品经理: {error.message}</p>
      ) : (
        <ErrorBoundary>
          <div className={'main'}>
            <div className={'main-header'}>
              <div>
                <div className={'fz13 color334 fw400'}>打款中收入</div>
                <div
                  style={{ marginTop: 10 }}
                  className={'fz26 color030 fw600'}
                >
                  <span className={'fz13 fw600 mr2'}>¥</span>
                  {cashapply?.applyingMoney}
                </div>
              </div>
              <div>
                <div className={'fz13 color334 fw400'}>已打款收入</div>
                <div
                  style={{ marginTop: 10 }}
                  className={'fz26 color030 fw600'}
                >
                  <span className={'fz13 fw600 mr2'}>¥</span>
                  {cashapply?.applyEdMoney}
                </div>
              </div>
            </div>
            <div className={'main-content'}>
              <div>
                <div className={'fz13 color334 fw400'}>打款失败收入</div>
                <div
                  style={{ marginTop: 10 }}
                  className={'fz26 color300 fw600'}
                >
                  <span className={'fz13 fw600 mr2'}>¥</span>
                  {cashapply?.applyFailMoney}
                </div>
              </div>
              <div className={'main-content-click'} onClick={getCheckFail}>
                查看失败明细
              </div>
            </div>
            <div className={'main-footer fz11'} onClick={naviToScreenBankInfo}>
              <div className={'color636 fw400'}>
                打款失败请核对收款信息是否正确，
              </div>
              <span className={'fw400'}>点击核对</span>
              <img
                src={rightPNG}
                style={{ width: 5, height: 10, marginLeft: 5 }}
              />
            </div>
          </div>
        </ErrorBoundary>
      )}
    </>
  );
};
