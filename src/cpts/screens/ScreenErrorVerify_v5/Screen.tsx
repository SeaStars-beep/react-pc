import React, { ReactNode } from 'react';
import { Result, ImagePicker } from 'antd-mobile';
import useViewModel from './view.model';
import nocodePNG from '@assets/images/nocode.png';
import whitePNG from '@assets/images/upload-car.png';
import icon from '@assets/images/wenhao.png';

interface ErrorVerifyProps {
  code: number;
  msg: string;
  storeId: number;
  verificationCode: string;
}

export default (props: ErrorVerifyProps): ReactNode => {
  const {
    storeImg,
    handleChangeUploadImg,
    handleSubmit,
    isBtnDisable,
  } = useViewModel();
  const { msg = '', verificationCode = '', code = 0, storeId = 0 } = props;
  return (
    <div className="screen-error-verify">
      <div className="result">
        <img className="img" src={nocodePNG} alt="" />
        <p className="title">{msg}</p>
        <p className="detail">券码：{verificationCode}</p>
        <div className="hr"></div>
      </div>
      {/* code === 4000 */}
      {code === 4000 && (
        <>
          <div className={'image-item'}>
            <ImagePicker
              onChange={handleChangeUploadImg}
              selectable={true}
              style={{ height: 208 }}
              length={1}
              disableDelete={false}
            />
            <img
              className="default-img"
              src={storeImg ? storeImg : whitePNG}
              alt=""
            />
            <p className="tip" style={{ display: storeImg ? 'none' : 'block' }}>
              需要上传服务中或服务完成且<span className="red-text">含车牌</span>
              照片
            </p>
          </div>

          <button
            disabled={isBtnDisable}
            className="submit-btn"
            onClick={() => handleSubmit(storeId, verificationCode, storeImg)}
          >
            提交
          </button>
        </>
      )}

      <p className="bottom-text">
        <img src={icon} alt="" />
        <span>如果您对订单有疑问，请联系业务经理</span>
      </p>
    </div>
  );
};
