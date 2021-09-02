import React from 'react';
import { Modal } from 'antd-mobile';
import { useCallbackReliable, useScreenLauncher } from '@src/utils';
import ScreenWithdrawalList from '@src/cpts/screens/ScreenWithdrawalList';
import ScreenStoreIncome from '@src/cpts/screens/ScreenStoreIncomev1.6';
import { BlockATag } from '@src/common-cpts/BlockATag';
import { useStores } from '@src/store';

const useViewModel = () => {
  const { globalState } = useStores();
  const alert = Modal.alert;
  const { pushScreen } = useScreenLauncher();

  const businessManager = () => {
    const { phone } = globalState.supplierStore;
    alert(globalState.supplierStore.contact, '电话：' + phone, [
      {
        text: (
          <BlockATag href={`tel:${phone}`} onClick={(e) => e.stopPropagation()}>
            确认
          </BlockATag>
        ) as any,
      },
      { text: '取消' },
    ]);
  };
  const naviToScreenWithdrawalList = useCallbackReliable(
    (res?: any) => () => pushScreen(ScreenWithdrawalList, { ...res }),
    [pushScreen],
  );

  const handleClick = (status: boolean) => {
    if (status) {
      naviToScreenWithdrawalList()();
    } else {
      // 跳转立即提现
      pushScreen(ScreenStoreIncome);
    }
  };

  return {
    businessManager,
    handleClick,
  };
};

export default useViewModel;
