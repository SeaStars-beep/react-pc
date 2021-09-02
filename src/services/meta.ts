import axios, { AxiosResponse, Method } from 'axios';
import CryptoJS from 'crypto-js';
import { getSelfAppId } from '@src/utils';

const selfId = getSelfAppId();

export const rawIO = axios.create({
  withCredentials: false,
});
rawIO.interceptors.request.use((config) => {
  const key = 'token';
  const query = new URLSearchParams(location.href.split('?')[1]);
  const tokenFromBack = query.get('h5-' + key);
  const tokenInStorage = localStorage.getItem(key);
  const oilURLPattern = /^\/oil$|^\/oil\//;
  const jsConfigPattern = /jsconfig/;
  let token;
  if (tokenFromBack) {
    localStorage.setItem(key, tokenFromBack);
    token = tokenFromBack;
  } else {
    token = tokenInStorage;
  }

  if (!jsConfigPattern.test(config.url)) {
    if (token) {
      config.headers[key] = token;
    }
    config.headers['appId'] = selfId;
  }

  if (!config.responseType) {
    config.responseType = 'json';
  }
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
  }
  if (!oilURLPattern.test(config.url)) {
    config.url = '/cs' + config.url;
  }
  config.url = process.env.API_BACK + config.url;
  return config;
});

export enum ResultCode {
  OK = 200, // 成功
  UNAUTHORIZED = 401, // 非法访问
  NOT_PERMISSION = 403, // 没有权限
  NOT_FOUND = 404, // 资源不存在
  FAIL = 500, // 操作失败
  LOGIN_EXCEPTION = 4000, // 登录失败
  SYSTEM_EXCEPTION = 5000, // 系统异常
  PARAMETER_EXCEPTION = 5001, // 请求参数校验异常
  PARAMETER_PARSE_EXCEPTION = 5002, // 请求参数解析异常
  HTTP_MEDIA_TYPE_EXCEPTION = 5003, // HTTP内容类型异常
  SPRING_BOOT_PLUS_EXCEPTION = 5100,
  BUSINESS_EXCEPTION = 5101,
  DAO_EXCEPTION = 5102,
  VERIFICATION_CODE_EXCEPTION = 5103,
  AUTHENTICATION_EXCEPTION = 5104,
  UNAUTHENTICATED_EXCEPTION = 5105,
  UNAUTHORIZED_EXCEPTION = 5106,
  JWTDECODE_EXCEPTION = 5107,
  HTTP_REQUEST_METHOD_NOT_SUPPORTED_EXCEPTION = 5108,
  TOKEN_OVERDUE = 5109,
  OK2 = 1,
}
export interface Ret<DATA> {
  data: DATA;
  message: string;
  code: ResultCode;
  success: boolean;
}

type ResponsePromise<R> = Promise<AxiosResponse<Ret<R>>>;

export function makeIO<P, R = never>(
  method: Method,
  url: string | ((params: P) => string),
  makePayload?: (params: P) => any, // 参数 => 载荷 转换器，默认直接用参数作为载荷
): (params?: P) => ResponsePromise<R> {
  return (params?: P) =>
    rawIO({
      url: typeof url === 'string' ? url : url(params),
      method,
      data: makePayload ? makePayload(params) : params,
    });
}

export type SearchRet<E> = {
  pageIndex: number;
  pageSize: number;
  total: number;
  records: E[];
  totalMoney?: number;
};

export type SearchRetAnother<E> = {
  pageNum: number;
  pageSize: number;
  total: number;
  list: E[];
};

const str2Byte = (str: any) => {
  let pos = 0;
  let len = str.length;
  if (len % 2 != 0) {
    return null;
  }
  len /= 2;
  const hexA = [];
  for (let i = 0; i < len; i++) {
    const s = str.substr(pos, 2);
    let v = parseInt(s, 16);
    if (v >= 127) v = v - 255 - 1;
    hexA.push(v);
    pos += 2;
  }
  return hexA;
};

const arrayBufferToBase64 = (buffer: any) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const toSign = (
  cv: string,
  did: string,
  method: string,
  os: string,
  rsign: string,
  timestamp: string,
) => {
  const stringToSign = `cv=${cv}&did=${
    did || ''
  }&method=${method}&os=${os}&rsign=${rsign}&t=${timestamp}`;
  console.log(stringToSign, '：签名');
  const key = selfId;
  const nn = CryptoJS.enc.Utf8.parse(stringToSign);
  const sha1_result = CryptoJS.HmacSHA1(nn, key); // 第一个参数为加密字符串，第二个参数为公共秘钥
  const arr = str2Byte(sha1_result.toString());
  return arrayBufferToBase64(arr);
};

export function makePublicParams(url: string) {
  const t = `${new Date().getTime()}`;
  const cv = '1.0';
  const did = '123456';
  const os = '2';
  const rsign = '12345';
  return {
    t,
    appId: selfId,
    sign: toSign(cv, did, url, os, rsign, t),
    rsign,
    os,
    did,
    cv,
  };
}
