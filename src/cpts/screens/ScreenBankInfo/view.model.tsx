import React, { useState, useEffect } from 'react';
import { Modal } from 'antd-mobile';
import {
  get as getBankInfo,
  postPic,
  Category,
  PicDto,
} from '@src/services/store/bank';

import { postUpload } from '@src/services/store';
import { ResultCode } from '@src/services/meta';
import { useStores } from '@src/store';
import { readImg, compressImg } from '@src/utils/img';

const alert = Modal.alert;
interface BankDto {
  accountName: string;
  bankName: string;
  branchBankName: string;
  cardType: 1 | 2;
  accountNo: string;
  reservePhone: string;
  storeName: string;
  legalPersonName: string;
  certificateNo: string;
}

const useViewModel = () => {
  const { globalState } = useStores();
  const [picCom, setPicCom] = useState<string>('');
  const [picFro, setPicFro] = useState<string>('');
  const [picBack, setPicBack] = useState<string>('');
  const [bankInfo, setBankInfo] = useState<BankDto>({} as BankDto);

  /**
   *
   * @param imgFile
   * @param type  6 7 8
   */
  const handleUploadChange = async (imgFile: any, picCategory: number) => {
    const formData = new FormData();
    formData.append('file', imgFile);
    const { data: upRes } = await postUpload(formData);
    if (upRes?.success) {
      const picUrl = upRes?.data ?? '';
      const params: PicDto[] = [{ picUrl, picCategory }];
      const { data: sureRes } = await postPic(params);
      if (sureRes.success) {
        if (picCategory === Category.company) {
          setPicCom(picUrl);
        }
        if (picCategory === Category.front) {
          setPicFro(picUrl);
        }
        if (picCategory === Category.back) {
          setPicBack(picUrl);
        }
      }
    } else {
      alert('', upRes?.message);
    }
  };

  const initInfo = async () => {
    const obj = await getBankInfo();
    if (obj.data.code == ResultCode.OK) {
      const { companyPicture, idBack, idFront } = obj?.data?.data;
      setPicBack(idBack);
      setPicCom(companyPicture);
      setPicFro(idFront);
      setBankInfo(obj.data.data);
    } else {
      console.log(obj.data.message);
    }
  };

  useEffect(() => {
    initInfo();
  }, []);

  return {
    bankInfo,
    globalState,
    handleUploadChange,
    picCom,
    picFro,
    picBack,
    Category,
  };
};

export default useViewModel;
