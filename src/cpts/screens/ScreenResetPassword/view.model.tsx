import { useState, useEffect, useRef, useCallback } from 'react';
import { Toast } from 'antd-mobile';
import { useCallbackReliable, useScreenLauncher } from '@src/utils';
import { sendCode } from '@src/services/admin/send/code';
import { resetPassword } from '@src/services/admin/reset/password';
import { ResultCode } from '@src/services/meta';
import { useStores } from '@src/store';

const useViewModel = () => {
  const timer = useRef();
  const { globalState } = useStores();
  const { popScreen } = useScreenLauncher();
  const [count, setCount] = useState(60);
  const [accountValue, setAccountValue] = useState<string>('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const getVerificationCode = async () => {
    const res = await sendCode({
      mobile: phone,
      scene: '3',
    });
    if (res.data.code == ResultCode.OK) {
      console.log(res.data.data);
    }
    if (!timer.current) {
      (timer.current as any) = setInterval(() => {
        setCount((originCount) => {
          return originCount - 1;
        });
      }, 1000);
    }

    Toast.success('一分钟后可重新发送验证码');
  };

  const handleSetPhone = useCallbackReliable(
    (val: string) => {
      if (!accountValue) {
        Toast.fail('请输入登录账号');
        return;
      }
      if (!passwordConfirm || !passwordValue) {
        Toast.fail('请输入密码');
        return;
      }
      setPhone(val);
    },
    [accountValue, passwordConfirm, passwordValue],
  );

  const handleVerificationCode = useCallbackReliable(
    (val: string) => {
      if (!accountValue) {
        Toast.fail('请输入登录账号');
        return;
      }
      if (!passwordConfirm || !passwordValue) {
        Toast.fail('请输入密码');
        return;
      }
      if (!phone) {
        Toast.fail('请输入手机号');
        return;
      }
      setVerificationCode(val);
    },
    [accountValue, passwordConfirm, passwordValue, phone],
  );

  useEffect(() => {
    if (count <= 0 && timer.current) {
      clearInterval(timer.current);
      timer.current = null;
      setCount(60);
    }
  }, [count]);

  const tips = () => {
    Toast.success('一分钟后可重新发送验证码');
  };

  const onSaveClick = useCallbackReliable(async () => {
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/;
    if (!accountValue) {
      Toast.fail('请输入登录账号');
      return;
    }
    if (!passwordConfirm || !passwordValue) {
      Toast.fail('请输入密码');
      return;
    }
    if (passwordConfirm !== passwordValue) {
      Toast.fail('两次密码输入不一致');
      return;
    } else if (!reg.test(passwordValue)) {
      Toast.fail('仅支持英文加数字,6-14位长度的密码');
      return;
    }

    if (!phone) {
      Toast.fail('请输入手机号');
      return;
    }

    if (!verificationCode) {
      Toast.fail('请输入验证码');
      return;
    }

    const ret = await resetPassword({
      loginAccount: accountValue,
      mobile: phone,
      newPassword: passwordValue,
      confirmPassword: passwordConfirm,
      verCode: verificationCode,
    });
    if (ret.data.code == ResultCode.OK) {
      Toast.success('修改成功,请重新登录');
      popScreen();
    } else {
      Toast.success('修改失败');
    }
  }, [
    accountValue,
    phone,
    passwordConfirm,
    passwordValue,
    verificationCode,
    popScreen,
  ]);

  return {
    count,
    accountValue,
    phone,
    verificationCode,
    passwordValue,
    passwordConfirm,
    setCount,
    setAccountValue,
    setPhone,
    setVerificationCode,
    setPasswordValue,
    setPasswordConfirm,
    getVerificationCode,
    tips,
    onSaveClick,
    globalState,
    handleSetPhone,
    handleVerificationCode,
  };
};

export default useViewModel;
