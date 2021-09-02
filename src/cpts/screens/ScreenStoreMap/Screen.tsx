import './style.styl';

import React from 'react';
import useViewModel from './view.model';
import { SearchBar, WhiteSpace, Button } from 'antd-mobile';
import { observer } from 'mobx-react';
import { useStores } from '@src/store';
import { Bmap } from '@src/common-cpts/Bmap';

interface Props {
  address?: string;
  lng?: number;
  lat?: number;
  city?: string;
  getFixAddress?: (e: any) => void;
}

export default observer((props: Props) => {
  const {
    storeaddressMap,
    setStoreAddressMap,
    lngLatMap,
    handleLatLng,
    addressType,
    onSubmitPress,
    setAddressType,
    searchHeight,
    seaheight,
  } = useViewModel(props);
  return (
    <div className={'screen-store-map'}>
      <div ref={searchHeight}>
        <WhiteSpace size="sm" />
        <SearchBar
          value={storeaddressMap}
          placeholder="Search"
          onSubmit={(value) => {
            setAddressType(true);
          }}
          // onClear={(value) => setStoreAddressMap('')}
          onCancel={() => setStoreAddressMap('')}
          showCancelButton
          onChange={(value) => {
            setStoreAddressMap(value), setAddressType(false);
          }}
          cancelText="删除"
        />
        <WhiteSpace size="sm" />
      </div>
      <div
        className={''}
        style={{
          width: '100%',
          height: `calc(100vh-${seaheight}px)`,
        }}
      >
        <Bmap
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
          address={storeaddressMap}
          lngLat={lngLatMap}
          addressType={addressType}
          handleLatLng={handleLatLng}
          city={props.city}
          id="update-map"
        />
      </div>

      <div className={'submit'}>
        <Button className={'submit-btn'} onClick={onSubmitPress}>
          保存
        </Button>
      </div>
    </div>
  );
});
