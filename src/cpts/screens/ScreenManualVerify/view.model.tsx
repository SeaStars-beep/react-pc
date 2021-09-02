import { useEffect, useState, useCallback } from 'react';
import { useCallbackReliable, useScreenLauncher } from '@src/utils';
import { writeOff } from '@src/services/store/order/writeoff';
import { ResultCode } from '@src/services/meta';
import ScreenOrderDetail from '@src/cpts/screens/ScreenOrderDetail';
import { Toast } from 'antd-mobile';
import { OrderDetailProps } from '../ScreenOrderDetail/Screen';
import { useStores } from '@src/store';
import ScreenErrorVerify from '@src/cpts/screens/ScreenErrorVerify_v5';

export interface ViewModelConfig {
  verifyCode: string;
}
const useViewModel = (config?: ViewModelConfig) => {
  const [code, setCode] = useState<string>();
  const { pushScreen, popScreen } = useScreenLauncher();
  const { globalState } = useStores();

  const checkCode = useCallbackReliable(
    async (verifyCode?: string) => {
      const res = await writeOff({
        storeId: globalState.user.storeId,
        verificationCode: verifyCode || code,
      });
      if (res.data.code == ResultCode.OK || res.data.code == ResultCode.OK2) {
        const result = res.data.data;
        const props: OrderDetailProps = {
          orderId: result.orderId,
          productName: result.productName,
          phone: result.phone.replace(/(\d{3})\d*(\d{4})/, '$1****$2'),
          verifyTime: result.verifyTime,
          realMoney: result.supplierPrice,
        };
        pushScreen(ScreenOrderDetail, props);
      } else {
        Toast.fail((res.data as any).msg);
        pushScreen(ScreenErrorVerify, {
          code: res.data.code,
          msg: (res.data as any).msg,
          storeId: globalState.user.storeId,
          verificationCode: verifyCode || code,
        });
      }
    },
    [code, globalState.user.storeId, pushScreen],
  );

  useEffect(() => {
    if (config?.verifyCode) {
      popScreen();
      checkCode(config.verifyCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    code,
    setCode,
    checkCode,
  };
};

export default useViewModel;
