import React from 'react';
import rightPNG from '@assets/images/right.png';
import { useErrorBoundary } from 'use-error-boundary';
import { CashapplyParams } from '@src/services/store';

export type Props = {
  cashapply: CashapplyParams;
  getWithdrawalList: any;
};

export default (prop: Props) => {
  const { ErrorBoundary, didCatch, error, reset } = useErrorBoundary();
  const { cashapply, getWithdrawalList } = prop;
  return (
    <>
      {didCatch ? (
        <p>请将当前错误截图给产品经理: {error.message}</p>
      ) : (
        <ErrorBoundary>
          <div className={'footer'}>
            <div className={'footer-title'} onClick={getWithdrawalList}>
              <div className={'fw400'}>提现记录</div>
              <img
                src={rightPNG}
                style={{ width: 5, height: 10, marginLeft: 5 }}
              />
            </div>
            <div className={'footer-explain'}>
              <div
                style={{
                  fontSize: 15,
                  color: '#1E1E1E',
                  fontWeight: 600,
                  marginBottom: 15,
                }}
              >
                提现说明：
              </div>
              <p>1、门店给客户提供服务并核销券码以后可以提现对应的收入；</p>
              <p>
                2、金额小于300元的提现申请，每月可提现1次，提现后1个工作日到账；
              </p>
              <p>
                3、金额达到300元的提现申请，每天只能提一次，提现后1个工作日到账；
              </p>
              <p>4、如有任何疑问联系门店业务经理咨询。</p>
            </div>
          </div>
        </ErrorBoundary>
      )}
    </>
  );
};
