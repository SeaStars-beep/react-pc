import React from 'react';
import useViewModel from './view.model';
import { Button, InputItem, List } from 'antd-mobile';
import { useErrorBoundary } from 'use-error-boundary';
import { CashApplyInfo } from '@src/services/store';

const BankInfoHead = (props: CashApplyInfo) => {
  const { ErrorBoundary, didCatch, error, reset } = useErrorBoundary();
  const { canApplyMoney } = props;
  return didCatch ? (
    <div>请将当前错误截图给产品经理： {error.message}</div>
  ) : (
    <ErrorBoundary>
      <div className={'bank-info-head'}>
        <div>
          ￥<span>{canApplyMoney}</span>
        </div>
        提现金额
      </div>
    </ErrorBoundary>
  );
};

const BankInfoMain = (props: CashApplyInfo) => {
  const { ErrorBoundary, didCatch, error, reset } = useErrorBoundary();
  const {
    bankName,
    accountName,
    branchBankName,
    cardType,
    accountNo,
    storePhone,
  } = props;
  const {
    count,
    tips,
    verificationCode,
    getVerificationCode,
    setVerificationCode,
    verificationCodeChange,
    cashApplyConfirm,
    protalClick,
  } = useViewModel();
  return didCatch ? (
    <div>请将当前错误截图给产品经理： {error.message}</div>
  ) : (
    <ErrorBoundary>
      <div className={'bank-info-main'}>
        {props && (
          <List>
            <InputItem type="text" value={accountName} editable={false}>
              开户名称
            </InputItem>
            <InputItem value={bankName} editable={false}>
              开户银行
            </InputItem>
            <InputItem value={branchBankName} editable={false}>
              支行信息
            </InputItem>
            <InputItem
              value={cardType == 1 ? '企业对公户' : '个人银行卡'}
              editable={false}
            >
              卡类型
            </InputItem>
            <InputItem value={accountNo} editable={false}>
              储蓄卡号
            </InputItem>
            <InputItem value={storePhone} editable={false}>
              手机号
            </InputItem>
            <InputItem
              placeholder="请填写验证码"
              value={verificationCode}
              onChange={verificationCodeChange}
              extra={
                count === 60 || count === 0 ? '获取验证码' : `已发送${count}S`
              }
              onExtraClick={
                count > 0 && count < 60
                  ? tips
                  : () => {
                      getVerificationCode(storePhone);
                    }
              }
              className={'verificationCode'}
            >
              验证码
            </InputItem>
          </List>
        )}
      </div>
      <div className={'bank-info-foot'}>
        <Button
          onClick={() => {
            cashApplyConfirm(storePhone);
          }}
        >
          确认提现
        </Button>
        <p>
          收款信息不正确？
          <span onClick={protalClick}>{`联系业务经理 >`}</span>
        </p>
      </div>
    </ErrorBoundary>
  );
};

export default (props: CashApplyInfo) => {
  return (
    <div className={'screen-withdrawal-confirm'}>
      <BankInfoHead {...props} />
      <BankInfoMain {...props} />
    </div>
  );
};
