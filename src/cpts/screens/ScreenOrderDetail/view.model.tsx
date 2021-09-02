import React from 'react';
import { Modal } from 'antd-mobile';
import { BlockATag } from '@src/common-cpts/BlockATag';

const useViewModel = () => {
  const alert = Modal.alert;
  const businessManager = () => {
    alert('客服', '电话：4006610111', [
      {
        text: (
          <BlockATag
            href={`tel:4006610111`}
            onClick={(e) => e.stopPropagation()}
          >
            确认
          </BlockATag>
        ) as any,
      },
      { text: '取消' },
    ]);
  };

  return {
    businessManager,
  };
};

export default useViewModel;
