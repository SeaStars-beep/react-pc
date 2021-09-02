import { useEffect, useState } from 'react';
import { useCallbackReliable } from '@src/utils';
import { get as getIncome } from '@src/services/store/income';
import { StoreIncome } from '@src/entites';
import { useStores } from '@src/store';
const useViewModel = () => {
  const [storeIncomeList, setStoreIncomeList] = useState<StoreIncome[]>();
  const { globalState } = useStores();

  const init = useCallbackReliable(async () => {
    const ret = await getIncome({
      id: globalState.user.merchantId,
      pageNum: 1,
      pageSize: 10,
    });
    console.log(ret.data.data.list);
    if (ret.data.code === 1) {
      setStoreIncomeList(ret.data.data.list);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  return {
    storeIncomeList,
  };
};

export default useViewModel;
