import { useState, useEffect, useRef } from 'react';

import { useScreenLauncher } from '@src/utils';
import ScreenBankInfo from '@src/cpts/screens/ScreenBankInfo';
import {
  get as getRecordAll,
  ApplyStatus,
} from '@src/services/withdrawal/record';
import type { WithdrawalRecord } from '@src/services/withdrawal/record';
import { ResultCode } from '@src/services/meta';
import type { Tab } from './cpts/Tabs';
import type { Props } from './Screen';

export enum TabEnum {
  on = ApplyStatus.on,
  success,
  fail,
  all,
}

const useViewModel = (props: Props) => {
  const { status } = props;
  const { pushScreen } = useScreenLauncher();
  const [stateArr, setStateArr] = useState<Array<WithdrawalRecord>>([]);
  const [curTab, setCurTab] = useState<number>(
    status && status === ApplyStatus.fail ? status : TabEnum.all,
  ); //
  const list = useRef([]);

  const TABS = [
    {
      title: '全部',
      key: TabEnum.all,
    },
    {
      title: '打款中',
      key: TabEnum.on,
    },
    {
      title: '打款失败',
      key: TabEnum.fail,
    },
    {
      title: '打款成功',
      key: TabEnum.success,
    },
  ];

  const naviToScreenBankInfo = () => {
    pushScreen(ScreenBankInfo);
  };
  const initRecord = async () => {
    const { data: resdata } = await getRecordAll({
      pageIndex: 1,
      pageSize: 99999,
    });
    if (resdata?.code == ResultCode.OK) {
      const data = resdata?.data?.records ?? [];
      list.current = data;
      if (status && status === TabEnum.fail) {
        const final = data.filter(
          (item) => item.applyStatus === ApplyStatus.fail,
        );
        setStateArr(final);
      } else {
        setStateArr(data);
      }
    } else {
      console.log(resdata?.message);
    }
  };

  useEffect(() => {
    initRecord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** tab 切换 */
  const handleTabChange = async (e: Tab) => {
    setCurTab(e.key);
    if (e.key === TabEnum.all) {
      setStateArr(list.current);
    } else {
      const final = list.current.filter((item) => item.applyStatus === e.key);
      setStateArr(final);
    }
  };

  return {
    products: stateArr,
    setCurTab,
    curTab,
    handleTabChange,
    naviToScreenBankInfo,
    TABS,
  };
};

export default useViewModel;
