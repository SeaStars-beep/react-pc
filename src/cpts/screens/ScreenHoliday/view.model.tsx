import { useState } from 'react';
import { useCallbackReliable, useScreenLauncher } from '@src/utils';
import { put } from '@src/services/store';
import moment from 'moment';
import { ResultCode } from '@src/services/meta';
import { Toast } from 'antd-mobile';
import { useStores } from '@src/store';
import { refStructEnhancer } from 'mobx/dist/internal';

const useViewModel = () => {
  const { globalState } = useStores();
  const { popScreen } = useScreenLauncher();
  const { supplierStore } = globalState;
  const [reason, setReason] = useState<string>(supplierStore.holidayReason);
  const [startTime, setStartTime] = useState<Date>(
    supplierStore.openHoliday
      ? moment(supplierStore.openHoliday, 'YYYY-MM-DD').toDate()
      : undefined,
  );
  const [endTime, setEndTime] = useState<Date>(
    supplierStore.endHoliday
      ? moment(supplierStore.endHoliday, 'YYYY-MM-DD').toDate()
      : undefined,
  );

  const onPickReason = useCallbackReliable((val: string[]) => {
    setReason(val[0]);
  }, []);

  const onSavePress = useCallbackReliable(async () => {
    const ret = await put({
      id: globalState.supplierStore.id,
      holidayReason: reason,
      openHoliday: startTime
        ? moment(startTime).format('YYYY-MM-DD')
        : undefined,
      endHoliday: endTime ? moment(endTime).format('YYYY-MM-DD') : undefined,
    });
    if (ret.data.code !== ResultCode.OK) {
      const msg = `请求失败: ${ret.data.message}`;
      Toast.fail(msg);
      console.error(ret.data);
      return;
    }
    const r = await globalState.loadStore();
    if (r.data.code !== ResultCode.OK) {
      const msg = `请求失败: ${r.data.message}`;
      Toast.fail(msg);
      console.error(r.data);
      return;
    }
    Toast.success('保存成功');
    popScreen();
  }, [globalState, reason, startTime, endTime, popScreen]);

  const onHolidayStartTimeOk = useCallbackReliable(
    (newHolidayStartTime: Date) => {
      if (
        moment(newHolidayStartTime).format('YYYYMMDD') >=
          moment(endTime).format('YYYYMMDD') &&
        endTime !== undefined
      ) {
        Toast.fail('开始放假时间不能晚于重新营业时间');
      } else {
        setStartTime(newHolidayStartTime);
      }
    },
    [endTime],
  );

  const onHolidayEndTimeOk = useCallbackReliable(
    (newHolidayEndTime) => {
      if (
        moment(newHolidayEndTime).format('YYYY-MM-DD') <=
          moment(startTime).format('YYYY-MM-DD') &&
        startTime !== undefined
      ) {
        Toast.fail('开始放假时间不能晚于重新营业时间');
      } else {
        setEndTime(newHolidayEndTime);
      }
    },
    [startTime],
  );

  return {
    reason,
    onPickReason,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    onSavePress,
    store: globalState.supplierStore,
    onHolidayStartTimeOk,
    onHolidayEndTimeOk,
  };
};

export default useViewModel;
