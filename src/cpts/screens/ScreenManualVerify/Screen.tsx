import React from 'react';
import useViewModel, { ViewModelConfig } from './view.model';
import { InputItem, Button } from 'antd-mobile';

export default (props: ViewModelConfig) => {
  const { setCode, checkCode } = useViewModel(props);
  return (
    <div className={'screen-manual-verify'}>
      <InputItem placeholder="请填写核销码" clear onChange={setCode} />
      <Button type="primary" onClick={() => checkCode()}>
        验证
      </Button>
    </div>
  );
};
