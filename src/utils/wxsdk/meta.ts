// 所有API
export type API_NAME =
  | 'checkJsApi'
  | 'updateAppMessageShareData'
  | 'updateTimelineShareData'
  | 'onMenuShareWeibo'
  | 'onMenuShareQZone'
  | 'startRecord'
  | 'stopRecord'
  | 'onVoiceRecordEnd'
  | 'playVoice'
  | 'pauseVoice'
  | 'stopVoice'
  | 'onVoicePlayEnd'
  | 'uploadVoice'
  | 'downloadVoice'
  | 'chooseImage'
  | 'previewImage'
  | 'uploadImage'
  | 'downloadImage'
  | 'getLocalImgData'
  | 'translateVoice'
  | 'getNetworkType'
  | 'openLocation'
  | 'getLocation'
  | 'hideOptionMenu'
  | 'showOptionMenu'
  | 'hideMenuItems'
  | 'showMenuItems'
  | 'hideAllNonBaseMenuItem'
  | 'showAllNonBaseMenuItem'
  | 'closeWindow'
  | 'scanQRCode'
  | 'chooseWXPay'
  | 'openProductSpecificView'
  | 'addCard'
  | 'chooseCard'
  | 'openCard'
  | 'onSearchBeacons'
  | 'stopSearchBeacons'
  | 'startSearchBeacons'
  | 'openAddress';

export type MenuItemType =
  | 'menuItem:exposeArticle'
  | 'menuItem:setFont'
  | 'menuItem:dayMode'
  | 'menuItem:nightMode'
  | 'menuItem:refresh'
  | 'menuItem:profile'
  | 'menuItem:addContact'
  | 'menuItem:share:appMessage'
  | 'menuItem:share:timeline'
  | 'menuItem:share:qq'
  | 'menuItem:share:weiboApp'
  | 'menuItem:favorite'
  | 'menuItem:share:facebook'
  | 'menuItem:share:QZone'
  | 'menuItem:editTag'
  | 'menuItem:delete'
  | 'menuItem:copyUrl'
  | 'menuItem:originPage'
  | 'menuItem:readMode'
  | 'menuItem:openWithQQBrowser'
  | 'menuItem:openWithSafari'
  | 'menuItem:share:email'
  | 'menuItem:share:brand';

export type WXConfigArgs = {
  debug?: boolean;
  appId: string;
  timestamp: number;
  nonceStr: string;
  signature: string;
  jsApiList: API_NAME[];
};

export type CommonApiCallbackArgs = { errMsg: string };
export type CommonCallback = (
  result: Record<string, any> & CommonApiCallbackArgs,
) => void;
export type CommonApiArgs = {
  success?: CommonCallback;
  fail?: CommonCallback;
  complete?: CommonCallback;
  cancel?: CommonCallback;
  trigger?: CommonCallback;
};
