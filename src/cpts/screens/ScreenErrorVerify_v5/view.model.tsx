import { useCallbackReliable, useScreenLauncher } from '@src/utils';
import { useState } from 'react';
import { postUpload } from '@src/services/store';
import { ResultCode } from '@src/services/meta';
import { writeOff } from '@src/services/store/order/writeoff';
import { Toast } from 'antd-mobile';
import { readImg, compressImg } from '@src/utils/img';
import { OrderDetailProps } from '../ScreenOrderDetail/Screen';
// import ScreenManualVerify from '@src/cpts/screens/ScreenManualVerify';
import ScreenOrderDetail from '@src/cpts/screens/ScreenOrderDetail';

const useViewModel = () => {
  const { popScreen, pushScreen } = useScreenLauncher();
  const [storeImg, setStoreImg] = useState<any>('');
  const [isBtnDisable, setIsBtnDisable] = useState<boolean>(false);
  const handleChangeUploadImg = useCallbackReliable(
    async (files: any, operationType: string, index: number) => {
      if (operationType === 'add') {
        const file = files[0].file;
        // const formData = new FormData();
        // formData.append('file', file);

        const regImg = await readImg(file);
        const newImage = await compressImg(regImg, 1920, 1920);
        const formData = new FormData();
        formData.append('file', newImage as Blob);

        await postUpload(formData).then((res) => {
          setStoreImg(res.data.data);
          if (res.data.code === ResultCode.OK) {
          } else {
            Toast.fail('上传失败');
          }
        });
      } else if (operationType === 'remove') {
        setStoreImg(files);
      }
    },
    [],
  );
  const handleSubmit = async (
    storeId: any,
    verificationCode: any,
    picUrl: any,
  ) => {
    const res = await writeOff({
      storeId,
      verificationCode,
      picUrl,
    });
    if (res.data.code == ResultCode.OK || res.data.code == ResultCode.OK2) {
      setIsBtnDisable(true);
      // Toast.info(res.data.message);
      const result = res.data.data;
      const props: OrderDetailProps = {
        orderId: result.orderId,
        productName: result.productName,
        phone: result.phone.replace(/(\d{3})\d*(\d{4})/, '$1****$2'),
        verifyTime: result.verifyTime,
        realMoney: result.supplierPrice,
      };
      pushScreen(ScreenOrderDetail, props);
    } else {
      // setIsBtnDisable(true);
      Toast.fail((res.data as any).msg);
    }
    // pushScreen(ScreenManualVerify, { picUrl: storeImg });
  };
  return {
    storeImg,
    handleChangeUploadImg,
    handleSubmit,
    isBtnDisable,
  };
};

export default useViewModel;
