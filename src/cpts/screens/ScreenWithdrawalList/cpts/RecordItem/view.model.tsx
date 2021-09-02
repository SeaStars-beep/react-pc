import { useState, useEffect } from 'react';
import type { Props } from './index';

const useViewModel = (props: Props) => {
  const { data } = props;
  const [show, setShow] = useState(false);

  useEffect(() => {
    //
  }, []);

  return {
    data,
    show,
    setShow,
  };
};

export default useViewModel;
