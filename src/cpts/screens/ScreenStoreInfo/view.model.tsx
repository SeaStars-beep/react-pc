import { useCallbackReliable, useScreenLauncher } from '@src/utils';
import {
  put as putStore,
  getProvince,
  getCity,
  getArea,
  postUpload,
} from '@src/services/store';
import { ResultCode } from '@src/services/meta';
import { useEffect, useState } from 'react';
import { Store, PicCategory } from '@src/entites';
import { useStores } from '@src/store';
import { Toast } from 'antd-mobile';
import ScreenStoreMap from '@src/cpts/screens/ScreenStoreMap';

interface MapLngLat {
  lng?: number;
  lat?: number;
}

const useViewModel = () => {
  const { globalState } = useStores();
  const { popScreen, pushScreen } = useScreenLauncher();
  const [curStore, setCurStore] = useState<Store>(globalState.supplierStore);
  const [lngLatMap, setLngLatMap] = useState<MapLngLat>();
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [provinceCode, setProvinceCode] = useState([]);
  const [cityCode, setCityCode] = useState([]);
  const [area, setArea] = useState([]);
  const [areaCode, setAreaCode] = useState([]);
  const [storeImg, setStoreImg] = useState([]);
  const [address, setAddress] = useState('');

  const onChange = useCallbackReliable(
    (field: string) => (val: string) => {
      setCurStore({ ...curStore, [field]: val });
    },
    [curStore],
  );
  const onSubmitPress = useCallbackReliable(async () => {
    curStore.storePicture = storeImg[0].url;
    curStore.picUrl = [
      {
        picUrl: storeImg[0].url,
        picType: 2,
        picCategory: PicCategory.STOREIMAGE,
      },
    ];

    curStore.longitude = lngLatMap.lng;
    curStore.latitude = lngLatMap.lat;
    curStore.areaCode = areaCode[0];
    curStore.area = (() => {
      let name = '';
      area.forEach((it) => {
        if (it.value === areaCode[0]) {
          name = it.label;
        }
      });
      return name;
    })();
    curStore.provinceCode = provinceCode[0];
    curStore.province = (() => {
      let name = '';
      province.forEach((it) => {
        if (it.value === provinceCode[0]) {
          name = it.label;
        }
      });
      return name;
    })();
    curStore.cityCode = cityCode[0];
    curStore.city = (() => {
      let name = '';
      city.forEach((it) => {
        if (it.value === cityCode[0]) {
          name = it.label;
        }
      });
      return name;
    })();
    const ret = await putStore(curStore);
    if (ret.data.code !== ResultCode.OK) {
      const msg = `操作失败:${ret.data.message}`;
      Toast.fail(msg);
      console.error(ret.data);
      return;
    }
    const r = await globalState.loadStore();
    if (r.data.code !== ResultCode.OK) {
      Toast.fail(ret.data.message);
      return;
    }
    Toast.success('保存成功');
    setCurStore(globalState.supplierStore);
    popScreen();
  }, [
    area,
    areaCode,
    city,
    cityCode,
    curStore,
    globalState,
    lngLatMap,
    popScreen,
    province,
    provinceCode,
    storeImg,
  ]);

  const onResetPress = useCallbackReliable(() => {
    popScreen();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkToScreenStoreMap = () => {
    pushScreen(ScreenStoreMap, {
      address: globalState.supplierStore.address,
      lng: lngLatMap.lng,
      lat: lngLatMap.lat,
      city: globalState.supplierStore.city,
      getFixAddress: getFixAddress,
    });
  };

  const getFixAddress = useCallbackReliable((e) => {
    setLngLatMap({ lng: e.lng, lat: e.lat });
  }, []);

  const handleLatLng = useCallbackReliable((e) => {
    console.log(e);
    setLngLatMap({ lng: e.lng, lat: e.lat });
  }, []);

  const handleProvince = useCallbackReliable(async () => {
    const ret = await getProvince();
    const info = JSON.parse(JSON.stringify(ret.data.data.provinceList));
    info.forEach((it: any) => {
      it.label = it.province;
      it.value = it.provinceCode;
      delete it.province;
      delete it.provinceCode;
    });
    setProvince(info);
  }, []);

  const handleGetCity = useCallbackReliable(async (val?: Array<string>) => {
    const ret = await getCity({ provinceCode: val[0] });
    const info = JSON.parse(JSON.stringify(ret.data.data.cityList));
    info.forEach((it: any) => {
      it.label = it.city;
      it.value = it.cityCode;
      delete it.city;
      delete it.cityCode;
    });
    setCity(info);
  }, []);

  const getProvinceCode = useCallbackReliable(
    async (val?: Array<string>) => {
      setProvinceCode(val);
      handleGetCity(val);
    },
    [handleGetCity],
  );

  const handleGetArea = useCallbackReliable(async (val) => {
    const ret = await getArea({ cityCode: val[0] });
    const info = JSON.parse(JSON.stringify(ret.data.data.areasList));
    info.forEach((it: any) => {
      it.label = it.area;
      it.value = it.areaCode;
      delete it.area;
      delete it.areaCode;
    });
    setArea(info);
  }, []);

  const getCityCode = useCallbackReliable(
    async (val) => {
      setCityCode(val);
      handleGetArea(val);
    },
    [handleGetArea],
  );

  const getAreaCode = useCallbackReliable(async (val) => {
    setAreaCode(val);
  }, []);

  const handleChangeUploadImg = useCallbackReliable(
    async (files: any, operationType: string, index: number) => {
      if (operationType === 'add') {
        const file = files[0].file;
        const formData = new FormData();
        formData.append('file', file);
        await postUpload(formData).then((res) => {
          setStoreImg([{ url: res.data.data }]);
          if (res.data.code === ResultCode.OK) {
          }
        });
      } else if (operationType === 'remove') {
        setStoreImg(files);
      }
    },
    [],
  );

  useEffect(() => {
    handleProvince();
    console.log(globalState.supplierStore);
    setLngLatMap({
      lng: globalState.supplierStore.longitude,
      lat: globalState.supplierStore.latitude,
    });
    setAddress(globalState.supplierStore.address);
    setStoreImg([{ url: globalState.supplierStore.storePicture }]);
    setProvinceCode([globalState.supplierStore.provinceCode]);
    setCityCode([globalState.supplierStore.cityCode]);
    handleGetCity([globalState.supplierStore.provinceCode]);
    setAreaCode([globalState.supplierStore.areaCode]);
    handleGetArea([globalState.supplierStore.cityCode]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    onChange,
    onSubmitPress,
    store: globalState.supplierStore,
    onResetPress,
    checkToScreenStoreMap,
    lngLatMap,
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
    handleLatLng,
    address,
    setAddress,
  };
};

export default useViewModel;
