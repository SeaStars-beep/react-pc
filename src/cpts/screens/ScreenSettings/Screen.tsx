import React from 'react';
import useViewModel from './view.model';

import { List } from 'antd-mobile';

export default () => {
  const { logoutConfirm, onModifyPasswordPress } = useViewModel();
  return (
    <div className={'screen-setting'}>
      <List>
        <List.Item arrow="horizontal" onClick={onModifyPasswordPress}>
          修改密码
        </List.Item>
        <List.Item onClick={logoutConfirm} arrow="horizontal">
          退出登录
        </List.Item>
      </List>
    </div>
  );
};
