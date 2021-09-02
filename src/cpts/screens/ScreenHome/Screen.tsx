import React from 'react';
import { IconF } from '@src/common-cpts/IconF';
import { IconFont } from '@src/common-cpts/IconF/meta';
import useViewModel from './view.model';
import { observer } from 'mobx-react';
import allordersPNG from '@assets/images/allorders.png';
import bankInfoPNG from '@assets/images/bankInfo.png';
import holidayPNG from '@assets/images/holiday.png';
import managerPNG from '@assets/images/manager.png';
import opentimePNG from '@assets/images/opentime.png';
import servicePNG from '@assets/images/service.png';
import settingPNG from '@assets/images/setting.png';
import storeIncomePNG from '@assets/images/storeIncome.png';
import storeInfoPNG from '@assets/images/storeInfo.png';

export default observer(() => {
  const {
    naviToScreenAllOrders,
    naviToScreenStoreIncome,
    naviToScreenBusinessTime,
    naviToScreenStoreInfo,
    naviToScreenServiceList,
    naviToScreenHoliday,
    naviToScreenSettings,
    naviToScreenBankInfo,
    naviToScreenManualVerify,
    businessManager,
    onScanVerifyClick,
    globalState,
  } = useViewModel();
  return (
    <div className={'screen-home'}>
      <div className={'screen-home-head'}>
        <div className={'screen-home-img'}>
          <img src={globalState.supplierStore?.storePicture} />
        </div>
        <h1>{globalState.supplierStore?.storeName}</h1>
      </div>
      <div className={'screen-home-mid'}>
        <div onClick={onScanVerifyClick} className={'mid-main'}>
          <IconF type={IconFont.Scanning} />
          <span>扫一扫</span>
        </div>
        <div className={'mid-main'} onClick={naviToScreenManualVerify}>
          <IconF type={IconFont.QRCode} />
          <span>核销码</span>
        </div>
      </div>
      <div className={'screen-home-service'}>
        <h1>门店尊享服务</h1>
      </div>
      <div className={'screen-home-grid'}>
        <div className={'item-wrapper'}>
          <div
            className={'screen-home-grid-item'}
            onClick={naviToScreenAllOrders}
          >
            <div>
              <img src={allordersPNG} />
            </div>
            <span>全部订单</span>
          </div>
        </div>
        <div className={'item-wrapper'}>
          <div
            className={'screen-home-grid-item'}
            onClick={naviToScreenStoreIncome}
          >
            <div>
              <img src={storeIncomePNG} />
            </div>
            <span>门店收入</span>
          </div>
        </div>
        <div className={'item-wrapper'}>
          <div
            className={'screen-home-grid-item'}
            onClick={naviToScreenBusinessTime}
          >
            <div>
              <img src={opentimePNG} />
            </div>
            <span>营业时间</span>
          </div>
        </div>
        <div className={'item-wrapper'}>
          <div
            className={'screen-home-grid-item'}
            onClick={naviToScreenStoreInfo}
          >
            <div>
              <img src={storeInfoPNG} />
            </div>
            <span>门店信息</span>
          </div>
        </div>
        <div className={'item-wrapper'}>
          <div
            className={'screen-home-grid-item'}
            onClick={naviToScreenServiceList}
          >
            <div>
              <img src={servicePNG} />
            </div>
            <span>我的服务</span>
          </div>
        </div>
        <div className={'item-wrapper'}>
          <div
            className={'screen-home-grid-item'}
            onClick={naviToScreenHoliday}
          >
            <div>
              <img src={holidayPNG} />
            </div>
            <span>放假公告</span>
          </div>
        </div>
        <div className={'item-wrapper'}>
          <div className={'screen-home-grid-item'} onClick={businessManager}>
            <div>
              <img src={managerPNG} />
            </div>
            <span>业务经理</span>
          </div>
        </div>
        <div className={'item-wrapper'}>
          <div
            className={'screen-home-grid-item'}
            onClick={naviToScreenBankInfo}
          >
            <div>
              <img src={bankInfoPNG} />
            </div>
            <span>收款信息</span>
          </div>
        </div>
        <div className={'item-wrapper'}>
          <div
            className={'screen-home-grid-item'}
            onClick={naviToScreenSettings}
          >
            <div>
              <img src={settingPNG} />
            </div>
            <span>设置</span>
          </div>
        </div>
      </div>
    </div>
  );
});
