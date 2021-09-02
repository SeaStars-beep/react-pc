import React from 'react';
import useViewModel from './view.model';
import Upload from './cpts/Upload';
import cardCompany from '@assets/images/cardCompany.png';
import userFront from '@assets/images/userFront.png';
import userBack from '@assets/images/userback.png';

export default () => {
  const {
    bankInfo,
    handleUploadChange,
    picCom,
    picFro,
    picBack,
    Category,
  } = useViewModel();
  const {
    accountName = '', // 开户名称
    bankName = '', // 开户银行
    branchBankName = '', // 	支行信息
    cardType = 1, //  卡类型 1 对公 2 对私
    accountNo = '', // 银行卡号
    reservePhone = '', // 手机号
    storeName = '', // 企业名称
    legalPersonName = '', // 	法人姓名
    certificateNo = '', // 营业执照 、身份证
  } = bankInfo ?? {};
  console.log(bankInfo);

  enum AccType {
    public = 1,
    private,
  }

  return (
    <div className={'screen-bank-info'}>
      <div className={'bank-info-main'}>
        <div className={'bank-info-item'}>
          <div className={'bank-info-label'}>开户名称 :</div>
          <span className={'bank-info-con'}>{accountName}</span>
        </div>
        <div className={'bank-info-item'}>
          <div className={'bank-info-label'}>开户银行 :</div>
          <span className={'bank-info-con'}>{bankName}</span>
        </div>
        <div className={'bank-info-item'}>
          <div className={'bank-info-label'}>支行信息 :</div>
          <span className={'bank-info-con'}>{branchBankName}</span>
        </div>
        <div className={'bank-info-item'}>
          <div className={'bank-info-label'}>卡类型 :</div>
          <span className={'bank-info-con'}>
            {cardType === AccType.public ? '对公' : '对私'}
          </span>
        </div>
        <div className={'bank-info-item'}>
          <div className={'bank-info-label'}>储蓄卡号 :</div>
          <span className={'bank-info-con'}>{accountNo}</span>
        </div>
        <div className={'bank-info-item'}>
          <div className={'bank-info-label'}>手机号 :</div>
          <span className={'bank-info-con'}>{reservePhone}</span>
        </div>
        <div className={'bank-info-item'}>
          <div className={'bank-info-label'}>企业名称 :</div>
          <span className={'bank-info-con'}>{storeName}</span>
        </div>
        {cardType === AccType.public && (
          <div className={'bank-info-item'}>
            <div className={'bank-info-label'}>营业执照 :</div>
            <span className={'bank-info-con'}>{certificateNo}</span>
          </div>
        )}
        {cardType === AccType.private && (
          <div className={'bank-info-item'}>
            <div className={'bank-info-label'}>身份证号 :</div>
            <span className={'bank-info-con'}>{certificateNo}</span>
          </div>
        )}

        <div className={'bank-info-item'}>
          <div className={'bank-info-label'}>法人姓名 :</div>
          <span className={'bank-info-con'}>{legalPersonName}</span>
        </div>

        <div className={'bank-info-item'}>
          <div className={'bank-info-label'}>营业执照:</div>
          <div className={'bank-info-con-block'}>
            <div className={'block-type6'}>
              <Upload
                preBg={cardCompany}
                img={picCom}
                callback={(e) => handleUploadChange(e, Category.company)}
              />
            </div>
          </div>
        </div>
        <div className={'bank-info-item'}>
          <div className={'bank-info-label'}>收款人身份证:</div>
          <div className={'bank-info-con-block special'}>
            <div className={'block-type7'}>
              <Upload
                key="front"
                preBg={userFront}
                img={picFro}
                callback={(e) => handleUploadChange(e, Category.front)}
              />
            </div>
            <div className={'block-type7'}>
              <Upload
                key="back"
                preBg={userBack}
                img={picBack}
                callback={(e) => handleUploadChange(e, Category.back)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
