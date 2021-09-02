import React from 'react';
import useViewModel from './view.model';
import { List, InputItem, Button } from 'antd-mobile';
import { observer } from 'mobx-react';

export default observer(() => {
  const {
    passwordValue,
    oldpasswordValue,
    passwordConfirm,
    setPasswordValue,
    setoldPasswordValue,
    setPasswordConfirm,
    onSaveClick,
    globalState,
  } = useViewModel();
  return (
    <div className={'screen-password'}>
      <div className={'password-main'}>
        <List>
          <InputItem value={globalState.user.phone} editable={false}>
            商家账号
          </InputItem>
          <InputItem
            type="password"
            placeholder="请填写原密码"
            value={oldpasswordValue}
            onChange={setoldPasswordValue}
          >
            原密码
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
        </List>
        <div className={'screen-password-tips'}>
          密码长度6~14个字符，支持数字，字母和符号
        </div>
        <Button className={'btn'} onClick={onSaveClick}>
          保存
        </Button>
      </div>
    </div>
  );
});
