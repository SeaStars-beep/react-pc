import { useState, useEffect } from 'react';
import { useCallbackReliable } from '@src/utils';
import { put as putStore, get as getStore } from '@src/services/store/index';
import { ResultCode } from '@src/services/meta';
import { Store } from '@src/entites';
import { useStores } from '@src/store';
import moment from 'moment';
import { Toast } from 'antd-mobile';

const useViewModel = () => {
  const [store, setStore] = useState<Store>({});
  const { globalState } = useStores();

  const now = new Date();
  const [opentime, setopenTime] = useState(now);
  const [endtime, setendTime] = useState(now);

  useEffect(() => {
    async function storeTime() {
      const res = await getStore({
        supplierStoreId: globalState.user.supplierStoreId,
      });
      if (res.status === ResultCode.OK) {
        setStore(res.data.data);
        const { openStart, endStart } = res.data.data;
        setopenTime(moment(openStart, 'HH:mm').toDate());
        setendTime(moment(endStart, 'HH:mm').toDate());
      } else {
        console.log(res.data.message);
      }
    }
    storeTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCheck = (value: Date) => {
    if (moment(value).format('HH.mm') > '12.00') {
      Toast.fail('营业时间不得晚于12：00', 1);
    } else {
      setopenTime(new Date(value));
    }
  };
  const endCheck = (value: Date) => {
    if (moment(value).format('HH.mm') < '13.00') {
      Toast.fail('营业结束时间不得早于13：00', 1);
    } else {
      setendTime(new Date(value));
    }
  };

  const setStoreTime = useCallbackReliable(async () => {
    const obj = await putStore({
      id: globalState.user.supplierStoreId,
      openStart: opentime ? moment(opentime).format('HH:mm') : undefined,
      endStart: endtime ? moment(endtime).format('HH:mm') : undefined,
    });
    if (obj.status === ResultCode.OK) {
      if (obj.data.data) {
        Toast.success('保存成功', 1);
      } else {
        Toast.fail('保存失败', 1);
      }
    } else {
      console.log(obj.data.message);
    }
  }, [globalState.user.supplierStoreId, opentime, endtime]);

  const formatStartTime = useCallbackReliable(
    (date?: Date) =>
      date
        ? moment(date).format('HH:mm')
        : moment(opentime || undefined).format('HH:mm'),
    [opentime],
  );

  const formatEndTime = useCallbackReliable(
    (date?: Date) =>
      date
        ? moment(date).format('HH:mm')
        : moment(endtime || undefined).format('HH:mm'),
    [endtime],
  );

  return {
    store,
    opentime,
    endtime,
    setStoreTime,
    openCheck,
    endCheck,
    formatStartTime,
    formatEndTime,
  };
};

export default useViewModel;
