import './style.styl';

import React from 'react';
import useViewModel from './view.model';
import { List, Button, WhiteSpace, DatePicker } from 'antd-mobile';
const Item = List.Item;

export const Screen = () => {
  const {
    opentime,
    endtime,
    setStoreTime,
    openCheck,
    endCheck,
    formatStartTime,
    formatEndTime,
  } = useViewModel();

  return (
    <div className="screenBusinessTime-list">
      <DatePicker
        mode="time"
        title="请选择时间"
        value={opentime}
        onOk={openCheck}
        format={formatStartTime}
      >
        <Item arrow="horizontal" className="item">
          <div className="flex-h">
            <div>上班时间</div>
            <div className="showTime" />
          </div>
        </Item>
      </DatePicker>
      <DatePicker
        mode="time"
        title="请选择时间"
        value={endtime}
        onOk={endCheck}
        format={formatEndTime}
      >
        <Item arrow="horizontal" className="item">
          <div className="flex-h">
            <div>下班时间</div>
            <div className="showTime" />
          </div>
        </Item>
      </DatePicker>
      <Button className="button" onClick={setStoreTime}>
        保存
      </Button>
      <WhiteSpace />
    </div>
  );
};
