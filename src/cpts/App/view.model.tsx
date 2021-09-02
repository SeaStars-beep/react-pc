import { useEffect, useState } from 'react';
import { ScreenPusher, ScreenStackFragment } from '@src/meta';
import { useCallbackReliable } from '@src/utils';
import * as wxsdk from '@src/utils/wxsdk';
import { get as getUser } from '@src/services/user';
import { ResultCode } from '@src/services/meta';
import { Toast } from 'antd-mobile';
import { get as getConfig } from '@src/services/wx';
import ScreenLogin from '@src/cpts/screens/ScreenLogin';
import { useStores } from '@src/store';

const useViewModel = () => {
  const [screenStack, setScreenStack] = useState<ScreenStackFragment[]>([]);
  const [loading, setLoading] = useState(true);
  const { globalState } = useStores();

  const pushScreen = useCallbackReliable<ScreenPusher>(
    (config, args) => {
      setScreenStack([...screenStack, { config, args }]);
    },
    [screenStack],
  );

  const popScreen = useCallbackReliable(() => {
    screenStack.pop();
    setScreenStack([...screenStack]);
  }, [screenStack]);

  const cleanScreen = useCallbackReliable(
    (newStack: ScreenStackFragment[] = []) => {
      setScreenStack(newStack);
    },
    [],
  );

  const initUser = useCallbackReliable(async () => {
    setLoading(true);
    const ret = await getUser();
    if (ret.data.code === ResultCode.TOKEN_OVERDUE) {
      setLoading(false);
      return pushScreen(ScreenLogin);
    }
    if (ret.data.code !== ResultCode.OK) {
      setLoading(false);
      const msg = '请求失败：' + ret.data.message;
      Toast.fail(msg);
      console.error(ret);
      throw new Error(msg);
    }
    globalState.user = ret.data.data;
    const r = await globalState.loadStore();
    setLoading(false);
    if (r.data.code !== ResultCode.OK) {
      const msg = `请求失败：` + r.data.message;
      Toast.fail(msg);
      console.error(r.data);
      throw new Error(msg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const init = useCallbackReliable(async () => {
    setLoading(true);
    await initUser();
    try {
      const configRes = await getConfig({
        url: window.location.href.split('#')[0],
      });
      await wxsdk.config({
        ...configRes.data.data,
        jsApiList: ['checkJsApi', 'scanQRCode'],
      });
      console.log('jssdk ready!');
    } catch (err) {
      console.error('jssdk init error!');
    }
    setLoading(false);
  }, [initUser]);
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    pushScreen,
    popScreen,
    screenStack,
    cleanScreen,
    loading,
  };
};

export default useViewModel;
