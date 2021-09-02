import { useState } from 'react';
import { useCallbackReliable } from '@src/utils';

const useViewModel = () => {
  const [count, setCount] = useState<number>(0);
  const onClick = useCallbackReliable(() => setCount(count + 1), [count]);

  return {
    count,
    onClick,
  };
};

export default useViewModel;
