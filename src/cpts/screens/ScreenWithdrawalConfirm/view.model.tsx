import React, { useState, useEffect, useRef } from 'react';
import { Modal, Toast } from 'antd-mobile';
import { post as cashApply } from '@src/services/cashapply/cashApplyConfirm';
import { sendCode } from '@src/services/sms';
import { useStores } from '@src/store';
import { BlockATag } from '@src/common-cpts/BlockATag';
import { useScreenLauncher } from '@src/utils';
import ScreenWithdrawalRes from '../ScreenWithdrawalRes';

const alert = Modal.alert;
const useViewModel = () => {
  const { globalState } = useStores();
  const { pushScreen } = useScreenLauncher();
  const timer = useRef();
  const [count, setCount] = useState(60);
  const [verificationCode, setVerificationCode] = useState('');
  const getVerificationCode = async (storePhone: string) => {
    const res = await sendCode({
      phone: storePhone,
      type: 5,
    });
    if (!timer.current) {
      (timer.current as any) = setInterval(() => {
        setCount((originCount) => {
          return originCount - 1;
        });
      }, 1000);
    }
    Toast.success('一分钟后可重新发送验证码');
  };

  const tips = () => {
    Toast.success('一分钟后可重新发送验证码');
  };

  const protalClick = () => {
    alert(
      globalState.supplierStore.contact,
      `电话：${globalState.supplierStore.phone}`,
      [
        {
          text: (
            <BlockATag
              href={`tel:${globalState.supplierStore.phone}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              确定
            </BlockATag>
          ) as any,
        },
        { text: '取消' },
      ],
    );
  };

  const verificationCodeChange = (value: string) => {
    setVerificationCode(value);
  };

  const cashApplyConfirm = async (storePhone: string) => {
    if (!verificationCode) {
      Toast.fail('请输入验证码');
      return;
    }

    const res = await cashApply({
      phone: storePhone,
      type: 5,
      code: verificationCode,
    });
    pushScreen(ScreenWithdrawalRes, {
      status: res.data?.success,
      msg: res.data?.message ?? '',
    });
  };

  useEffect(() => {
    return function cleanUp() {
      if (count <= 0 && timer.current) {
        clearInterval(timer.current);
        timer.current = null;
        setCount(60);
      }
    };
  }, [count]);

  return {
    count,
    protalClick,
    getVerificationCode,
    tips,
    verificationCode,
    setVerificationCode,
    cashApplyConfirm,
    verificationCodeChange,
  };
};

export default useViewModel;
