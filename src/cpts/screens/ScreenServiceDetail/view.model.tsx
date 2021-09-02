import { useState, useEffect } from 'react';
import { useCallbackReliable } from '@src/utils';
import { get as getProduct } from '@src/services/product/index';
import { ResultCode } from '@src/services/meta';
import { Product } from '@src/entites';

const useViewModel = (props: { id: string }) => {
  const [product, setProduct] = useState<Product>({});
  useEffect(() => {
    async function products() {
      const res = await getProduct({
        id: props.id,
      });
      if (res.data.code == ResultCode.OK) {
        setProduct(res.data.data);
      } else {
        console.log(res.data.message);
      }
    }

    products();
  }, [props.id]);

  return {
    product,
  };
};

export default useViewModel;
