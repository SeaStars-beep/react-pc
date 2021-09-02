import { useState } from 'react';
import { Toast } from 'antd-mobile';
import { useCallbackReliable, useScreenLauncher } from '@src/utils';
import { putPassword } from '@src/services/admin';
import { ResultCode } from '@src/services/meta';
import { useStores } from '@src/store';

const useViewModel = () => {
  const { globalState } = useStores();
  const { popScreen } = useScreenLauncher();
  const [oldpasswordValue, setoldPasswordValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const onSaveClick = useCallbackReliable(async () => {
    if (passwordConfirm !== passwordValue) {
      Toast.fail('两次密码输入不一致');
      return;
    } else if (passwordValue.length < 6 || passwordValue.length > 14) {
      Toast.fail('仅支持6-14位长度的密码');
      return;
    }
    const ret = await putPassword({
      phone: globalState.user.phone,
      oldPassword: oldpasswordValue,
      newPassword: passwordValue,
    });
    if (ret.data.code !== ResultCode.OK) {
      Toast.fail(ret.data.message);
      return;
    }
    Toast.success('修改成功');
    popScreen();
  }, [
    passwordConfirm,
    passwordValue,
    globalState.user.phone,
    oldpasswordValue,
    popScreen,
  ]);

  return {
    passwordValue,
    oldpasswordValue,
    passwordConfirm,
    setPasswordValue,
    setoldPasswordValue,
    setPasswordConfirm,
    onSaveClick,
    globalState,
  };
};

export default useViewModel;
