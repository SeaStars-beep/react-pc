import { useState, useEffect } from 'react';
import type { Props, Tab } from './index';

const useViewModel = (props: Props) => {
  const { data, callback, activeKey } = props;
  const [active, setActive] = useState(activeKey);
  const handleClick = async (tab: Tab) => {
    setActive(tab?.key);
    callback(tab);
  };

  useEffect(() => {
    //
  }, []);

  return {
    active,
    handleClick,
    data,
  };
};

export default useViewModel;
