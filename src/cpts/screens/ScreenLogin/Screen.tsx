import React from 'react';
import useViewModel from './view.model';
import { InputItem, Button } from 'antd-mobile';
import logoPNG from '@assets/images/logo.png';

export default () => {
  const {
    onSubmitClick,
    setPassword,
    setPhone,
    naviToScreenResetPassword,
  } = useViewModel();
  return (
    <div className={'screen-login'}>
      <div className={'login-logo'}>
        <img src={logoPNG} />
      </div>
      <InputItem
        onChange={setPhone}
        placeholder={'请输入登录账号'}
        type={'phone'}
      >
        登录账号
      </InputItem>
      <InputItem
        onChange={setPassword}
        placeholder={'请输入登录密码'}
        type={'password'}
      >
        登录密码
      </InputItem>
      {/* <span className={'login-span'} onClick={naviToScreenResetPassword}>
        忘记密码？
      </span> */}
      <Button type={'primary'} onClick={onSubmitClick}>
        登 录
      </Button>
    </div>
  );
};
