import React from 'react';
import useViewModel from './view.model';
import type { WithdrawalRecord } from '@src/services/withdrawal/record';
import { ApplyStatus } from '@src/services/withdrawal/record';

export interface Props {
  data?: WithdrawalRecord;
  [prop: string]: any;
}

const Index = (props: Props) => {
  const { data, show, setShow } = useViewModel(props);
  const labels = {
    [ApplyStatus.on]: {
      txt: '打款中',
      class: 'on',
    },
    [ApplyStatus.success]: {
      txt: '打款成功',
      class: 'success',
    },
    [ApplyStatus.fail]: {
      txt: '打款失败',
      class: 'fail',
    },
  };
  return (
    <div className={'item-wrap'}>
      <div className={'item-top'}>
        <div className={'item-left-wrap'}>
          <span className={'item-price'}>¥{data?.applyMoney}</span>
          <span className={'item-time'}>{data?.createTime}</span>
        </div>
        <div className={'item-right-wrap'}>
          <span className={`item-status ${labels[data?.applyStatus]?.class}`}>
            {labels[data?.applyStatus]?.txt}
          </span>
          {data?.applyStatus === ApplyStatus.fail && (
            <span className={'item-other'} onClick={() => setShow((e) => !e)}>
              失败详情 {'>'}
            </span>
          )}
        </div>
      </div>
      <div
        className={'detail-wrap'}
        style={{ display: show ? 'inline-block' : 'none' }}
      >
        {data?.applyStatus === ApplyStatus.fail && data?.failRemark}
      </div>
    </div>
  );
};
export default Index;
