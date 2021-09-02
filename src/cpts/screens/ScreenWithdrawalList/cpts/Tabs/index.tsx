import React from 'react';
import useViewModel from './view.model';

export interface Tab {
  title: string;
  key: number;
}

export interface Props {
  activeKey: string | number;
  data: Tab[];
  callback: (e: Tab) => void;
}
const Index = (props: Props) => {
  const { data, handleClick, active } = useViewModel(props);

  return (
    <div className={'tab-wrap'}>
      {data?.map((item) => (
        <div
          key={item.key}
          onClick={() => handleClick(item)}
          className={`tab-item ${item.key === active ? 'tab-active' : ''}`}
        >
          <span className={'tab-txt'}>{item?.title}</span>
        </div>
      ))}
    </div>
  );
};

export default Index;
