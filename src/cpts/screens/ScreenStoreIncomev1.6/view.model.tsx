import { useEffect, useState } from 'react';
import { useCallbackReliable } from '@src/utils';
import {
  getCashapply,
  CashapplyParams,
  getCashApplyInfo,
  CashApplyInfo,
} from '@src/services/store';
import { useStores } from '@src/store';
import { ResultCode } from '@src/services/meta';
import { Modal } from 'antd-mobile';
import ScreenWithdrawalConfirm from '@src/cpts/screens/ScreenWithdrawalConfirm';
import ScreenWithdrawalList from '@src/cpts/screens/ScreenWithdrawalList';
import ScreenBankInfo from '@src/cpts/screens/ScreenBankInfo';
import { useScreenLauncher } from '@src/utils';
import { Toast } from 'antd-mobile';

const alert = Modal.alert;
const useViewModel = () => {
  const [cashapply, setCashapply] = useState<CashapplyParams>();
  const [cash, setCash] = useState<CashApplyInfo>();
  const { globalState } = useStores();
  const { pushScreen } = useScreenLauncher();

  const init = useCallbackReliable(async () => {
    const ret = await getCashapply();
    if (ret.data.code == ResultCode.OK || ret.data.code == ResultCode.OK2) {
      setCashapply(ret.data.data);
    } else {
      console.log(ret.data.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCash = async () => {
    const ret = await getCashApplyInfo({ money: cashapply.canApplyMoney });
    if (ret.data.code === ResultCode.OK || ret.data.code === ResultCode.OK2) {
      console.log(ret.data.data);
      setCash(ret.data.data);
      if (ret.data.data.status === 1) {
        alert('您需要补充收款信息哦', '', [
          {
            text: '取消',
            style: 'default',
          },
          { text: '去完善', onPress: () => pushScreen(ScreenBankInfo) },
        ]);
      } else {
        const data = { ...ret.data.data };
        data.canApplyMoney = cashapply.canApplyMoney;
        pushScreen(ScreenWithdrawalConfirm, data);
      }
    } else {
      Toast.fail(ret.data.message);
    }
  };

  const getWithdrawalList = () => {
    pushScreen(ScreenWithdrawalList);
  };

  const getCheckFail = () => {
    pushScreen(ScreenWithdrawalList, { status: 2 });
  };

  const naviToScreenBankInfo = () => {
    pushScreen(ScreenBankInfo);
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    cashapply,
    getCash,
    getWithdrawalList,
    getCheckFail,
    naviToScreenBankInfo,
  };
};

export default useViewModel;
