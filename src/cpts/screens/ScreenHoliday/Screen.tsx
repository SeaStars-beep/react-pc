import './style.styl';

import React from 'react';
import useViewModel from './view.model';
import { List, Picker, DatePicker, Button } from 'antd-mobile';
import { observer } from 'mobx-react';
import moment from 'moment';

const reasons = [
  '人手不够',
  '店铺搬迁',
  '店铺装修',
  '环评检查',
  '市政限水',
  '店主外出',
  '修路施工',
  '疫情',
].map((e) => ({ label: e, value: e }));

export default observer(() => {
  const {
    reason,
    onPickReason,
    startTime,
    setStartTime,
    endTime,
    onSavePress,
    onHolidayEndTimeOk,
    onHolidayStartTimeOk,
  } = useViewModel();
  return (
    <div className={'screen-holiday'}>
      <List>
        <DatePicker
          mode="date"
          title="请选择时间"
          value={startTime}
          onChange={onHolidayStartTimeOk}
        >
          <List.Item arrow="horizontal">开始放假</List.Item>
        </DatePicker>
        <DatePicker
          mode="date"
          title="请选择时间"
          value={endTime}
          onChange={onHolidayEndTimeOk}
        >
          <List.Item arrow="horizontal">重新营业</List.Item>
        </DatePicker>
        <Picker
          cols={1}
          data={reasons}
          title={'请选择'}
          value={[reason]}
          onChange={onPickReason}
        >
          <List.Item arrow="horizontal">放假原因</List.Item>
        </Picker>
      </List>

      <Button className={'btn'} onClick={onSavePress}>
        保存
      </Button>
    </div>
  );
});
