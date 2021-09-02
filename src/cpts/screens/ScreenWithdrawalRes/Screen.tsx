import React from 'react';
import useViewModel from './view.model';
import './style.styl';

export interface Props {
  status?: true | false;
  msg?: string;
}

const Index = (props: Props) => {
  const { businessManager, handleClick } = useViewModel();
  const { status = true, msg = '' } = props;

  return (
    <div className={'screen-withdrawal-res'}>
      <div className={'screen-con'}>
        <div className={`screen-con-img ${status ? 'success' : 'fail'}`}></div>
        <span className={'screen-con-text'}>
          {status ? '提交成功' : '提交失败'}{' '}
        </span>
      </div>
      <div className={'msgCon'}>{msg ?? ''}</div>
      <div className={'submit-content'}>
        <div className={'submit-btn'} onClick={() => handleClick(status)}>
          {status ? '查看提现记录' : '重新提现'}
        </div>
      </div>
      {!status && (
        <div className={'either'} onClick={businessManager}>
          可联系业务经理解决 {'>'}
        </div>
      )}
    </div>
  );
};

export default Index;
