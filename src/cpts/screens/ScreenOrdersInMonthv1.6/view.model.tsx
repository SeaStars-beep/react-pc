import { useEffect, useState } from 'react';
import { useCallbackReliable, useScreenLauncher } from '@src/utils';
import ScreenOrderDetail from '@src/cpts/screens/ScreenOrderDetail';
import {
  get as getOrderMonth,
  verifydetailParams,
} from '@src/services/store/order/verifydetail';
import { ResultCode } from '@src/services/meta';
import {
  VerifydetailDateType,
  VerifyDetailRes,
  VerifyRes,
  VerifyResListItem,
  PayStatusName,
  VerifydetailDateTypeName,
} from '@src/entites';
import { Toast } from 'antd-mobile';
import { OrderDetailProps } from '../ScreenOrderDetail/Screen';
import { useStores } from '@src/store';
import ScreenBankInfo from '@src/cpts/screens/ScreenBankInfo';
import moment from 'moment';

export type ViewModelCoifng = {
  inStack?: boolean;
  res: VerifyRes;
};

export enum TabTimeEnum {
  TIME = '时间',
  TIME_INTERVAL = '时间区间',
}
const useViewModel = (config: ViewModelCoifng) => {
  const [showModal, setShowModal] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [total, setTotal] = useState(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [dateType, setDateType] = useState<number>(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [orderStatus, setOrderStatus] = useState<number>(-1);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [tab, setTab] = useState<string>('时间');
  const [barStatus, setBarStatus] = useState<string>('全部');
  const [barTime, setBarTime] = useState<string>(() => {
    const [year, rest] = config.res.verifyTime.split('年');
    const month = rest.slice(1);
    return month;
  });
  const { pushScreen } = useScreenLauncher();

  const [orderMonthInfo, setOrderMonthInfo] = useState<VerifyDetailRes[]>([]);

  const naviToScreenBankInfo = () => {
    pushScreen(ScreenBankInfo);
  };

  const loadData = useCallbackReliable(
    async (
      verifyTime?: string,
      dateTypeStatus?: number,
      orderStatusType?: number,
    ) => {
      const params: verifydetailParams = {
        orderStatus: orderStatusType ? orderStatusType : orderStatus,
        pageIndex: pageIndex,
        pageSize: 500,
      };
      if (verifyTime) {
        params.verifyTime = verifyTime;
      }
      if (tab === TabTimeEnum.TIME_INTERVAL) {
        params.startTime = startTime;
        params.endTime = endTime;
        params.dateType = VerifydetailDateType.TIME_interval;
      } else {
        params.dateType = dateTypeStatus ? dateTypeStatus : dateType;
      }

      const res = await getOrderMonth(params);

      if (res.data.code == ResultCode.OK || res.data.code == ResultCode.OK2) {
        setOrderMonthInfo(res.data.data.records);
        setTotal(res.data.data.total);
        setTotalMoney(res.data.data.totalMoney);
      } else {
        console.log(res.data.message);
      }
    },
    [orderStatus, pageIndex, tab, startTime, endTime, dateType],
  );
  const onClosePopClick = () => {
    setShowModal(false);
  };

  const handleTab = (tab: any) => {
    setTab(tab.title);
  };

  useEffect(() => {
    const verifyTime = moment(config.res.verifyTime, 'YYYY年MM月');
    loadData(verifyTime.format('YYYY-MM'), VerifydetailDateType.MONTH, -1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onShowPopClick = useCallbackReliable(() => {
    setDateType(1);
    setShowModal(true);
  }, []);

  const onRefresh = () => {
    // if (storeList.length >= total) return;
    loadData();
  };

  const getDateType = (dateType: number) => {
    setDateType(dateType);
  };

  const getOrderStatus = (orderStatus: number) => {
    setOrderStatus(orderStatus);
    if (orderStatus !== -1) {
      setBarStatus(PayStatusName.get(orderStatus));
    } else {
      setBarStatus('全部');
    }
  };

  const getTimeInterval = (time: number) => () => {
    console.log(time);
  };

  const getStartTime = (date: string) => {
    setStartTime(date);
  };

  const getEndTime = (date: string) => {
    setEndTime(date);
  };
  const handleSearch = () => {
    if (tab === TabTimeEnum.TIME_INTERVAL) {
      const difference = moment(startTime).add(3, 'M');
      if (!moment(endTime).isBefore(difference)) {
        Toast.fail('时间跨度不得大于3个月');
        return;
      }
      if (!startTime) {
        Toast.fail('开始时间必填');
        return;
      }
      if (!endTime) {
        Toast.fail('截至时间必填');
        return;
      }
      console.log(
        !moment(startTime).isSameOrBefore(endTime),
        startTime,
        endTime,
        '!moment(startTime).isSameOrBefore(endTime)',
      );
      if (!moment(startTime).isSameOrBefore(endTime)) {
        Toast.fail('截至时间不得小于开始时间');
        return;
      }
    }

    if (tab === TabTimeEnum.TIME) {
      setBarTime(VerifydetailDateTypeName.get(dateType));
    } else {
      setBarTime(`${startTime} ~ ${endTime}`);
    }
    onClosePopClick();
    loadData();
  };

  return {
    orderMonthInfo,
    dateType,
    orderStatus,
    refreshing,
    showModal,
    barStatus,
    barTime,
    total,
    totalMoney,
    onClosePopClick,
    onRefresh,
    onShowPopClick,
    getDateType,
    getOrderStatus,
    getTimeInterval,
    getStartTime,
    getEndTime,
    handleSearch,
    handleTab,
    naviToScreenBankInfo,
  };
};

export default useViewModel;
