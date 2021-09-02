import React from 'react';

import { useScreenLauncher } from '@src/utils';

import ScreenAllOrders from '@src/cpts/screens/ScreenAllOrders';
import ScreenStoreIncome from '@src/cpts/screens/ScreenStoreIncomev1.6';
import ScreenBusinessTime from '@src/cpts/screens/ScreenBusinessTime';
import ScreenStoreInfo from '@src/cpts/screens/ScreenStoreInfo';
import ScreenServiceList from '@src/cpts/screens/ScreenServiceList';
import ScreenHoliday from '@src/cpts/screens/ScreenHoliday';
import ScreenSettings from '@src/cpts/screens/ScreenSettings';
import ScreenBankInfo from '@src/cpts/screens/ScreenBankInfo';
import ScreenManualVerify from '@src/cpts/screens/ScreenManualVerify';
import ScreenWithdrawalRes from '@src/cpts/screens/ScreenWithdrawalRes';

import { Modal } from 'antd-mobile';
import { useStores } from '@src/store';
import { scanQRCode } from '@src/utils/wxsdk';
import { ViewModelConfig as ManualVerifyViewModelConfig } from '@src/cpts/screens/ScreenManualVerify/view.model';
import { BlockATag } from '@src/common-cpts/BlockATag';

const useViewModel = () => {
  const { globalState } = useStores();
  const { pushScreen } = useScreenLauncher();
  const alert = Modal.alert;
  const naviToScreenAllOrders = () => {
    pushScreen(ScreenAllOrders);
  };
  const naviToScreenStoreIncome = () => {
    pushScreen(ScreenStoreIncome);
    // pushScreen(ScreenWithdrawalRes);
  };
  const naviToScreenBusinessTime = () => {
    pushScreen(ScreenBusinessTime);
  };
  const naviToScreenStoreInfo = () => {
    pushScreen(ScreenStoreInfo);
  };
  const naviToScreenServiceList = () => {
    pushScreen(ScreenServiceList);
  };
  const naviToScreenHoliday = () => {
    pushScreen(ScreenHoliday);
  };
  const naviToScreenSettings = () => {
    pushScreen(ScreenSettings);
  };
  const naviToScreenBankInfo = () => {
    pushScreen(ScreenBankInfo);
  };
  const naviToScreenManualVerify = () => {
    pushScreen(ScreenManualVerify);
  };

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

  const onScanVerifyClick = async () => {
    const { resultStr } = await scanQRCode({ needResult: 1 });
    const props: ManualVerifyViewModelConfig = { verifyCode: resultStr };
    pushScreen(ScreenManualVerify, props);
  };

  return {
    naviToScreenAllOrders,
    naviToScreenStoreIncome,
    naviToScreenBusinessTime,
    naviToScreenStoreInfo,
    naviToScreenServiceList,
    naviToScreenHoliday,
    naviToScreenSettings,
    naviToScreenBankInfo,
    naviToScreenManualVerify,
    businessManager,
    onScanVerifyClick,
    globalState,
  };
};

export default useViewModel;
