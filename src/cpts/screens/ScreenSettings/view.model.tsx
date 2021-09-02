import { useCallbackReliable, useScreenLauncher } from '@src/utils';
import { Modal } from 'antd-mobile';
import ScreenPassword from '@src/cpts/screens/ScreenPassword';
import { logout } from '@src/services';

const alert = Modal.alert;

const useViewModel = () => {
  const { pushScreen } = useScreenLauncher();
  const logoutConfirm = () => {
    alert('提示', '确认退出吗？', [
      {
        text: '确认',
        onPress: async () => {
          await logout();
          localStorage.removeItem('token');
          location.reload();
        },
        style: 'default',
      },
      { text: '取消' },
    ]);
  };
  const onModifyPasswordPress = useCallbackReliable(() => {
    pushScreen(ScreenPassword);
  }, [pushScreen]);

  return {
    logoutConfirm,
    onModifyPasswordPress,
  };
};

export default useViewModel;
