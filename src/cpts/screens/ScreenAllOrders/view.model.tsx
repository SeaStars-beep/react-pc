import { useState, useEffect } from 'react';
import { useCallbackReliable, useScreenLauncher } from '@src/utils';
import ScreenOrdersInMonth from '@src/cpts/screens/ScreenOrdersInMonthv1.6';
import { get as getAllOrder } from '@src/services/store/order/verifylist';
import { ResultCode } from '@src/services/meta';
import { VerifyRes } from '@src/entites';
import { useStores } from '@src/store';

const useViewModel = () => {
  const { globalState } = useStores();
  const { pushScreen } = useScreenLauncher();
  const [ordersInfo, setOrdersInfo] = useState<Array<VerifyRes>>();

  const naviToScreenOrdersInMonth = useCallbackReliable(
    (res: VerifyRes) => () => {
      pushScreen(ScreenOrdersInMonth, { res });
    },
    [pushScreen],
  );

  useEffect(() => {
    async function test() {
      const res = await getAllOrder({
        storeId: globalState.user.storeId,
        // storeId: 95952,
      });
      if (res.data.code == ResultCode.OK || res.data.code == ResultCode.OK2) {
        setOrdersInfo(res.data.data);
      } else {
        console.log(res.data.message);
      }
    }

    test();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ordersInfo,
    naviToScreenOrdersInMonth,
  };
};

export default useViewModel;
