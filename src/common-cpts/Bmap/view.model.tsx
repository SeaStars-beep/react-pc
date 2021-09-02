/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useEffect, useState } from 'react';
import { useCallbackReliable } from '@src/utils';
import { ResultCode } from '@src/services/meta';
interface Props {
  style: any;
  handleLatLng?: (e: any) => void;
  lngLat?: {
    lng?: number;
    lat?: number;
  };
  address?: string;
  addressType?: boolean;
  id?: string;
  city?: string;
}

const useViewModel = (props: Props) => {
  const [addressMap, setAddressMap] = useState<string>();
  const [lngLatMap, setLngLatMap] = useState({ lng: 0, lat: 0 });
  const { lngLat, address, handleLatLng, addressType, city } = props;

  const handMap = useCallbackReliable(() => {
    const map = new (window as any).BMap.Map(props.id, {
      coordsType: 5,
    });
    const {
      BMAP_ANCHOR_TOP_RIGHT,
      BMAP_NAVIGATION_CONTROL_SMALL,
      BMAP_ANCHOR_TOP_LEFT,
    } = (window as any).BMap;
    const top_left_control = new (window as any).BMap.ScaleControl({
      anchor: BMAP_ANCHOR_TOP_LEFT,
    });
    const top_left_navigation = new (window as any).BMap.NavigationControl();
    const top_right_navigation = new (window as any).BMap.NavigationControl({
      anchor: BMAP_ANCHOR_TOP_RIGHT,
      type: BMAP_NAVIGATION_CONTROL_SMALL,
    });
    map.addControl(top_left_control);
    map.addControl(top_left_navigation);
    map.addControl(top_right_navigation);
    map.addControl(new (window as any).BMap.GeolocationControl());
    let point = new (window as any).BMap.Point();
    if (lngLat?.lat && lngLat?.lng) {
      point = new (window as any).BMap.Point(lngLat?.lng, lngLat?.lat);
    } else {
      map.setViewport('center');
    }
    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom(true);
    const marker = new (window as any).BMap.Marker(point);
    map.addOverlay(marker);
    marker.enableDragging();

    const myGeo = new (window as any).BMap.Geocoder();
    console.log(lngLat?.lat, lngLat?.lng);
    map.addOverlay(marker);
    marker.addEventListener('dragend', function (e: any) {
      setLngLatMap({ lng: e.point.lng, lat: e.point.lat });
      myGeo.getLocation(
        new (window as any).BMap.Point(e.point.lng, e.point.lat),
        function (result: any) {
          if (result) {
            setAddressMap(result.address);
            handleLatLng({
              lng: e.point.lng,
              lat: e.point.lat,
              address: result.address,
            });
          }
        },
      );
    });
    return { map, marker, point };
  }, []);

  const handleMyGeo = useCallbackReliable((value: string, city?: string) => {
    console.log(value, city);
    const { marker } = handMap();
    const myGeo = new (window as any).BMap.Geocoder();
    myGeo.getPoint(
      value,
      function (point: any) {
        console.log(point);
        if (point) {
          marker.setPosition(point);
          myGeo.getLocation(
            new (window as any).BMap.Point(point.lng, point.lat),
            function (result: any) {
              console.log(result);
              if (result) {
                setAddressMap(result.address);
                handleLatLng({
                  lng: point.lng,
                  lat: point.lat,
                  address: result.address,
                });
              }
            },
          );
          console.log(marker);
        }
      },
      city,
    );
  }, []);

  useEffect(() => {
    const { marker, map } = handMap();
    let point = new (window as any).BMap.Point();
    const lng = lngLat?.lng;
    const lat = lngLat?.lat;
    if (lat && lng) {
      point = new (window as any).BMap.Point(lng, lat);
      map.centerAndZoom(point, 15);
      marker.setPosition(point);
    }
  }, [lngLat?.lat, lngLat?.lng]);

  useEffect(() => {
    console.log(address, city);
    if (address && addressType) {
      handleMyGeo(address, city);
    }
  }, [address, addressType, city]);

  useEffect(() => {
    handMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {};
};

export default useViewModel;
