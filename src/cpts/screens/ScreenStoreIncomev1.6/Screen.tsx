import React from 'react';
import useViewModel from './view.model';
import { useErrorBoundary } from 'use-error-boundary';
import CanApplyMoney from './cpts/CanApplyMoney/index';
import CashMain from './cpts/CashMain/index';
import CashExplain from './cpts/CashExplain/index';

export const Screen = () => {
  const {
    cashapply,
    getCash,
    getWithdrawalList,
    getCheckFail,
    naviToScreenBankInfo,
  } = useViewModel();

  return (
    <>
      <div className={'screen-income'}>
        <CanApplyMoney cashapply={cashapply} getCash={getCash}></CanApplyMoney>

        <CashMain
          cashapply={cashapply}
          getCheckFail={getCheckFail}
          naviToScreenBankInfo={naviToScreenBankInfo}
        ></CashMain>

        <CashExplain
          cashapply={cashapply}
          getWithdrawalList={getWithdrawalList}
        ></CashExplain>
      </div>
    </>
  );
};
