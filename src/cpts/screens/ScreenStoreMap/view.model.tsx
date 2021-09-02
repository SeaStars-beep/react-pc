import { useCallbackReliable, useScreenLauncher } from '@src/utils';
import { useEffect, useState, useRef } from 'react';
interface Props {
  address?: string;
  lng?: number;
  lat?: number;
  city?: string;
  getFixAddress?: (e: any) => void;
}

interface MapLngLat {
  lng?: number;
  lat?: number;
}

const useViewModel = (props: Props) => {
  const { popScreen } = useScreenLauncher();
  const [storeaddressMap, setStoreAddressMap] = useState<string>();
  const [storeChangeaddress, setChangeaddress] = useState<string>();
  const [lngLatMap, setLngLatMap] = useState<MapLngLat>();
  const [addressType, setAddressType] = useState(false);
  const [seaheight, setSeaHeight] = useState(30);
  const searchHeight = useRef(null);

  const handleLatLng = useCallbackReliable((e) => {
    setChangeaddress(e.address);
    setLngLatMap({ lng: e.lng, lat: e.lat });
  }, []);

  const onSubmitPress = useCallbackReliable(async () => {
    props.getFixAddress({ address: storeChangeaddress, ...lngLatMap });
    popScreen();
  }, [lngLatMap, popScreen, props, storeChangeaddress]);

  useEffect(() => {
    if (searchHeight.current) {
      setSeaHeight(searchHeight.current?.clientHeight);
    }
  }, [searchHeight]);

  useEffect(() => {
    setStoreAddressMap(props.address);
    setLngLatMap({ lng: props.lng, lat: props.lat });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    // onChange,
    storeaddressMap,
    lngLatMap,
    setStoreAddressMap,
    handleLatLng,
    addressType,
    onSubmitPress,
    setAddressType,
    searchHeight,
    seaheight,
  };
};

export default useViewModel;
