import React, { useState, useEffect } from 'react';
import { useMemoReliable, useScreenLauncher } from '@src/utils';
import ScreenServiceDetail from '@src/cpts/screens/ScreenServiceDetail';
import { get as productList } from '@src/services/product/list';
import { ResultCode } from '@src/services/meta';
import { Product, ProductStatus } from '@src/entites';
import { Modal } from 'antd-mobile';
import { useStores } from '@src/store';
import { BlockATag } from '@src/common-cpts/BlockATag';

const useViewModel = () => {
  const { globalState } = useStores();
  const alert = Modal.alert;
  const [stateArr, setStateArr] = useState<Array<Product>>([]);
  const { pushScreen } = useScreenLauncher();
  const naviToScreenServiceDetail = (a: number) => {
    pushScreen(ScreenServiceDetail, { id: a });
  };

  const businessManager = () => {
    const { phone } = globalState.supplierStore;
    alert(globalState.supplierStore.contact, '电话：' + phone, [
      {
        text: (
          <BlockATag href={`tel:${phone}`} onClick={(e) => e.stopPropagation()}>
            确认
          </BlockATag>
        ) as any,
      },
      { text: '取消' },
    ]);
  };

  useEffect(() => {
    async function test() {
      const res = await productList({
        pageIndex: 1,
        storeNo: globalState.user.storeNo,
        pageSize: 99999,
      });
      if (res.data.code == ResultCode.OK) {
        setStateArr(res.data.data.records);
      } else {
        console.log(res.data.message);
      }
    }

    test();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSaleProducts = useMemoReliable(
    () => stateArr.filter((e) => e.status === ProductStatus.Shelve),
    [stateArr],
  );
  const notForSaleProducts = useMemoReliable(
    () => stateArr.filter((e) => e.status === ProductStatus.OffShelve),
    [stateArr],
  );

  return {
    products: stateArr,
    onSaleProducts,
    notForSaleProducts,
    naviToScreenServiceDetail,
    businessManager,
  };
};

export default useViewModel;
