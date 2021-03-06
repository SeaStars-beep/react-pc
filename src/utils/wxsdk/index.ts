import {
  API_NAME,
  CommonApiCallbackArgs,
  WXConfigArgs,
  CommonApiArgs,
  CommonCallback,
  MenuItemType,
} from './meta';

declare const wx: {
  config: (args: WXConfigArgs) => void;
  ready: (callback: () => void) => void;
  error: (callback: (err: any) => void) => void;
} & Record<API_NAME, (args: Record<string, any> & CommonApiArgs) => void>;

type Base64String = string;

export const config = (args: WXConfigArgs): Promise<void> =>
  new Promise((resolve, reject) => {
    wx.config(args);
    wx.ready(resolve);
    wx.error(reject);
  });

function wrapApi<Arg, Result = Record<string, never>>(
  apiName: API_NAME,
): (args?: Arg) => Promise<Result & CommonApiCallbackArgs> {
  return (args?: Arg) =>
    new Promise((resolve, reject) =>
      (wx[apiName] as any)({
        ...args,
        success: resolve,
        fail: reject,
      }),
    );
}

export const checkJsApi = wrapApi<
  { jsApiList: API_NAME[] },
  {
    checkResult: { [apiName: string]: boolean };
  }
>('checkJsApi');
export const updateAppMessageShareData = wrapApi<{
  title: string;
  desc: string;
  link: string;
  imgUrl: string;
}>('updateAppMessageShareData');
export const updateTimelineShareData = wrapApi<{
  title: string;
  link: string;
  imgUrl: string;
}>('updateTimelineShareData');
export const onMenuShareWeibo = (
  args: {
    title: string;
    desc: string;
    link: string;
    imgUrl: string;
  },
  onCancel?: CommonCallback,
) =>
  new Promise((resolve: CommonCallback, reject) =>
    wx.onMenuShareWeibo({
      ...args,
      cancel: onCancel,
      success: resolve,
      fail: reject,
    }),
  );
export const onMenuShareQZone = (
  args: {
    title: string;
    desc: string;
    link: string;
    imgUrl: string;
  },
  onCancel?: () => void,
): Promise<CommonApiCallbackArgs> =>
  new Promise((resolve, reject) =>
    wx.onMenuShareQZone({
      ...args,
      success: resolve,
      fail: reject,
      cancel: onCancel,
    }),
  );
export const chooseImage = wrapApi<
  {
    count?: number;
    sizeType?: ('original' | 'compressed')[];
    sourceType?: ('album' | 'camera')[];
  },
  { localIds: string[] }
>('chooseImage');
export const previewImage = wrapApi<{
  current: string;
  urls: string[];
}>('previewImage');
export const uploadImage = wrapApi<
  {
    localId: string;
    isShowProgressTips?: number;
  },
  { serverId: string }
>('uploadImage');
export const downloadImage = wrapApi<
  {
    serverId: string;
    isShowProgressTips?: number;
  },
  { localId: string }
>('downloadImage');
export const getLocalImgData = wrapApi<
  {
    localId: string;
  },
  {
    localData: Base64String;
  }
>('getLocalImgData');
export const startRecord = () => wrapApi<void>('startRecord')();
export const stopRecord = () =>
  wrapApi<void, { localId: string }>('stopRecord')();
export const onVoiceRecordEnd = () =>
  new Promise(
    (
      resolve: (args: { localId: string } & CommonApiCallbackArgs) => void,
      reject,
    ) =>
      wx.onVoiceRecordEnd({
        fail: reject,
        complete: resolve,
      }),
  );
export const playVoice = wrapApi<{ localId: string }>('playVoice');
export const pauseVoice = wrapApi<{ localId: string }>('pauseVoice');
export const stopVoice = wrapApi<{ localId: string }>('stopVoice');
export const onVoicePlayEnd = wrapApi<void, { localId: string }>(
  'onVoicePlayEnd',
);
export const uploadVoice = wrapApi<
  {
    localId: string;
    isShowProgressTips?: number;
  },
  { serverId: string }
>('uploadVoice');
export const downloadVoice = wrapApi<
  {
    serverId: string;
    isShowProgressTips?: number;
  },
  { localId: string }
>('downloadVoice');
export const translateVoice = wrapApi<
  {
    localId: string;
    isShowProgressTips?: number;
  },
  { translateResult: string }
>('translateVoice');
export const getNetworkType = wrapApi<
  void,
  { networkType: '2g' | '3g' | '4g' | 'wifi' }
>('getNetworkType');
export const openLocation = wrapApi<{
  latitude: string;
  longitude: string;
  name: string;
  address: string;
  scale?: number;
  infoUrl: string;
}>('openLocation');
export const getLocation = wrapApi<
  { type?: 'wgs84' | 'gcj02' },
  {
    latitude: number;
    longitude: number;
  }
>('getLocation');
export const startSearchBeacons = (args: { ticket: string }) =>
  new Promise(
    (
      resolve: (arg: Record<string, never> & CommonApiCallbackArgs) => void,
      reject,
    ) => wx.startSearchBeacons({ ...args, complete: resolve, fail: reject }),
  );
export const stopSearchBeacons = () =>
  new Promise(
    (
      resolve: (args: Record<string, never> & CommonApiCallbackArgs) => void,
      reject,
    ) => wx.stopSearchBeacons({ complete: resolve, fail: reject }),
  );
export const onSearchBeacons = () =>
  new Promise(
    (
      resolve: (args: Record<string, never> & CommonApiCallbackArgs) => void,
      reject,
    ) => wx.onSearchBeacons({ complete: resolve, fail: reject }),
  );
export const closeWindow = wrapApi<void, never>('closeWindow');
export const hideMenuItems = wrapApi<{ menuList: MenuItemType[] }>(
  'hideMenuItems',
);
export const showMenuItems = wrapApi<{ menuList: MenuItemType[] }>(
  'showMenuItems',
);
export const hideAllNonBaseMenuItem = wrapApi<void>('hideAllNonBaseMenuItem');
export const showAllNonBaseMenuItem = wrapApi<void>('showAllNonBaseMenuItem');
export const scanQRCode = wrapApi<
  {
    needResult?: 0 | 1;
    scanType?: ('qrCode' | 'barCode')[];
  },
  { resultStr?: string }
>('scanQRCode');
export const openProductSpecificView = wrapApi<{
  productId: string;
  viewType?: 0 | 1 | 2;
}>('openProductSpecificView');
export const chooseCard = wrapApi<
  {
    shopId: string; // ??????Id
    cardType: string; // ????????????
    cardId: string; // ??????Id
    timestamp: number; // ?????????????????????
    nonceStr: string; // ?????????????????????
    signType?: string; // ????????????
    cardSign: string; // ????????????
  },
  { cardList: any[] }
>('chooseCard');
export const addCard = wrapApi<
  {
    cardList: {
      cardId: string;
      cardExt: string;
    }[];
  },
  { cardList: any[] }
>('addCard');
export const openCard = wrapApi<{
  cardList: {
    cardId: string;
    code: string;
  }[];
}>('openCard');
export const chooseWXPay = wrapApi<{
  timestamp: number; // ????????????????????????????????????jssdk??????????????????timestamp?????????????????????????????????????????????????????????????????????timeStamp???????????????????????????S??????
  nonceStr: string; // ????????????????????????????????? 32 ???
  package: string; // ???????????????????????????prepay_id??????????????????????????????prepay_id=\*\*\*???
  signType?: string; // ????????????????????????'SHA1'??????????????????????????????'MD5'
  paySign: string;
}>('chooseWXPay');
export const openAddress = wrapApi<
  void,
  {
    userName: string; // ???????????????
    postalCode: string; // ??????
    provinceName: string; // ??????????????????????????????????????????
    cityName: string; // ??????????????????????????????????????????
    countryName: string; // ?????????????????????????????????????????????
    detailInfo: string; // ????????????????????????
    nationalCode: string; // ?????????????????????
    telNumber: string; // ?????????????????????
  }
>('openAddress');
