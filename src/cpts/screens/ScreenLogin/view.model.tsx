import { useState } from 'react';
import { useCallbackReliable, useScreenLauncher } from '@src/utils';
import { login } from '@src/services';
import { ResultCode } from '@src/services/meta';
import { Toast } from 'antd-mobile';
import ScreenResetPassword from '@src/cpts/screens/ScreenResetPassword';

const useViewModel = () => {
  const { pushScreen } = useScreenLauncher();
  const [phone, setPhone] = useState<string>();
  const [password, setPassword] = useState<string>();

  const onSubmitClick = useCallbackReliable(async () => {
    const ret = await login({ phone: phone.replace(/\ /g, ''), password });
    if (ret.data.code !== ResultCode.OK) {
      const msg = `登录失败:${ret.data.message}`;
      Toast.fail(msg);
      console.error(ret);
      throw new Error(msg);
    }
    Toast.success('成功');
    localStorage.setItem('token', ret.data.data.token);
    location.reload();
  }, [phone, password]);

  const naviToScreenResetPassword = () => {
    pushScreen(ScreenResetPassword);
  };

  return {
    setPhone,
    setPassword,
    onSubmitClick,
    naviToScreenResetPassword,
  };
};

export default useViewModel;
