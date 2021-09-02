import './style.styl';

import React from 'react';
import useViewModel from './view.model';
import { Button, InputItem, Picker, List, ImagePicker } from 'antd-mobile';
import { observer } from 'mobx-react';
import { useStores } from '@src/store';
import { Bmap } from '@src/common-cpts/Bmap';

export default observer(() => {
  const { globalState } = useStores();
  const {
    onSubmitPress,
    onChange,
    onResetPress,
    checkToScreenStoreMap,
    lngLatMap,
    handleLatLng,
    province,
    city,
    provinceCode,
    getProvinceCode,
    getCityCode,
    cityCode,
    area,
    getAreaCode,
    areaCode,
    handleChangeUploadImg,
    storeImg,
    address,
    setAddress,
  } = useViewModel();
  const { supplierStore } = globalState;
  return supplierStore ? (
    <div className={'screen-store-info'}>
      <div className={'input-wrapper'}>
        <InputItem
          clear
          placeholder="请输入"
          defaultValue={supplierStore.storeName}
          onChange={onChange('storeName')}
          className={'info-content'}
        >
          门店名称
        </InputItem>
      </div>
      <div className={'input-wrapper'}>
        <Picker
          title="选择省"
          data={province}
          value={provinceCode}
          onOk={getProvinceCode}
          cols={1}
        >
          <List.Item arrow="horizontal" className={'info-content'}>
            省
          </List.Item>
        </Picker>
      </div>
      <div className={'input-wrapper'}>
        <Picker
          title="选择市"
          data={city}
          value={cityCode}
          onOk={getCityCode}
          cols={1}
        >
          <List.Item arrow="horizontal" className={'info-content'}>
            市
          </List.Item>
        </Picker>
      </div>
      <div className={'input-wrapper'}>
        <Picker
          title="选择区"
          data={area}
          value={areaCode}
          onOk={getAreaCode}
          cols={1}
        >
          <List.Item arrow="horizontal" className={'info-content'}>
            区
          </List.Item>
        </Picker>
      </div>

      <div className={'input-wrapper'}>
        <InputItem
          clear
          placeholder="请输入"
          defaultValue={supplierStore.address}
          onChange={onChange('address')}
          className={'info-content'}
          onVirtualKeyboardConfirm={(val: string) => setAddress(val)}
        >
          详细地址
        </InputItem>
      </div>

      <div className={'input-wrapper'}>
        <InputItem
          clear
          placeholder="请输入"
          defaultValue={supplierStore.mobile}
          onChange={onChange('mobile')}
          className={'info-content'}
        >
          联系电话
        </InputItem>
      </div>

      <div
        className={'input-wrapper'}
        style={{ borderBottom: '1px solid #ECECEC' }}
      >
        <div className={'info-address'} onClick={checkToScreenStoreMap}>
          <p className={'info-address-title'}>门店位置</p>
          <p className={'info-address-update'}>修改</p>
        </div>
        <div className={'map'}>
          <Bmap
            style={{ width: '100%', height: 200 }}
            address={address}
            lngLat={lngLatMap}
            addressType={false}
            handleLatLng={handleLatLng}
            id="info-map"
          />
        </div>
      </div>

      <div className={'input-wrapper'}>
        <div className={'info-address'}>
          <p className={'info-address-title'}>门头图片</p>
        </div>
        <div className={'image'}>
          <ImagePicker
            files={storeImg}
            onChange={handleChangeUploadImg}
            selectable={storeImg.length < 1}
            style={{ height: 208 }}
            length={1}
            disableDelete={false}
          />
        </div>
      </div>

      <div className={'submit-content'}>
        <Button className={'submit-btn'} onClick={onSubmitPress}>
          保存
        </Button>
      </div>
    </div>
  ) : (
    <div className={'screen-store-info'}>loading...</div>
  );
});
