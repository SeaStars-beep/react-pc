import { useEffect, useState } from 'react';
import { useCallbackReliable } from '@src/utils';
import moment from 'moment';
import { VerifydetailDateType, PayStatus } from '@src/entites';

export type Props = {
  showModal: boolean;
  onClosePopClick: any;
  getDateType: any;
  getOrderStatus: any;
  getTimeInterval: any;
  getStartTime: any;
  getEndTime: any;
  dateType: VerifydetailDateType;
  orderStatus: PayStatus;
  handleSearch: any;
  handleTab: any;
};

const useViewModel = (props: Props) => {
  const {
    dateType,
    orderStatus,
    getStartTime,
    getEndTime,
    handleSearch,
    getDateType,
    getOrderStatus,
    onClosePopClick,
  } = props;
  const [startTime, setStartTime] = useState<string>('开始时间');
  const [endTime, setEndTime] = useState<string>('截至日期');

  const [dateTypeStatus, setDateTypeStatus] = useState<number>(0);
  const [orderStatusTpye, setOrderStatusTpye] = useState<number>(-1);

  const handleStartTime = (date: Date) => {
    const time = moment(date).format('YYYY-MM-DD');
    setStartTime(time);
    getStartTime(time);
  };

  const handleEndTime = (date: Date) => {
    const time = moment(date).format('YYYY-MM-DD');
    setEndTime(time);
    getEndTime(time);
  };

  const handleReset = () => {
    setDateTypeStatus(1);
    setOrderStatusTpye(-1);
    getDateType(1);
    getOrderStatus(-1);
  };

  const handleClosePopClick = () => {
    setDateTypeStatus(1);
    setOrderStatusTpye(-1);
    getDateType(1);
    getOrderStatus(-1);
    onClosePopClick();
  };

  const getSearch = () => {
    handleSearch();
    setStartTime('开始时间');
    setEndTime('截至日期');
  };

  useEffect(() => {
    setDateTypeStatus(dateType);
    setOrderStatusTpye(orderStatus);
  }, [dateType, orderStatus]);

  return {
    handleStartTime,
    handleEndTime,
    startTime,
    endTime,
    dateTypeStatus,
    orderStatusTpye,
    getSearch,
    handleReset,
    handleClosePopClick,
  };
};

export default useViewModel;
