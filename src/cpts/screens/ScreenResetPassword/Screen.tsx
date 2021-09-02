import React from 'react';
import useViewModel from './view.model';
import { List, InputItem, Button } from 'antd-mobile';

export default () => {
  const {
    count,
    accountValue,
    phone,
    verificationCode,
    passwordValue,
    passwordConfirm,
    setAccountValue,
    setPhone,
    setVerificationCode,
    setPasswordValue,
    setPasswordConfirm,
    getVerificationCode,
    onSaveClick,
    tips,
    handleSetPhone,
    handleVerificationCode,
  } = useViewModel();
  return (
    <div className={'screen-reset-password'}>
      <div className={'password-main'}>
        <List>
          <InputItem
            placeholder="请输入登录账号"
            value={accountValue}
            onChange={setAccountValue}
          >
            登录账号
          </InputItem>
          <InputItem
            type="password"
            placeholder="请填写新密码"
            value={passwordValue}
            onChange={setPasswordValue}
          >
            新密码
          </InputItem>
          <InputItem
            type="password"
            placeholder="再次输入密码"
            value={passwordConfirm}
            onChange={setPasswordConfirm}
          >
            确认密码
          </InputItem>
          <InputItem
            placeholder="请填写手机号"
            value={phone}
            onChange={handleSetPhone}
          >
            手机号
          </InputItem>
          <InputItem
            placeholder="请填写验证码"
            value={verificationCode}
            onChange={handleVerificationCode}
            extra={`获取验证码${
              count === 60 || count === 0 ? '' : `(${count})`
            }`}
            onExtraClick={count > 0 && count < 60 ? tips : getVerificationCode}
          >
            验证码
          </InputItem>
        </List>
        <div className={'screen-password-tips'}>
          密码长度6~14个字符，支持数字，字母和符号
        </div>
        <Button className={'btn'} onClick={onSaveClick}>
          确认
        </Button>
      </div>
    </div>
  );
};
