import { makeNameMap } from '@src/utils';
export interface User {
  id: string;
  phone: string;
  storeNo: string;
  merchantId: string;
  storeId: number;
  supplierStoreId: number;
  // storeName: string;
}

export enum ProductChannel {
  ZiYing = 1,
  ChengNiu,
  CheDianDian,
  ShengXin,
  XiaoKun,
}

export enum ProductStatus {
  OffShelve,
  Shelve,
}

export enum ProductDelStatus {
  Normal,
  Del,
}

export enum ProductCategoryDelStatus {
  Normal,
  Del,
}

export enum StoreStatus {
  Rest,
  Open,
}

export enum StoreType {
  Direct,
  Tripartite,
}

export enum StoreServiceType {
  Beautify,
  CarWash,
  Double,
}

export enum StoreChannel {
  CheDianDian,
  ChengNiu,
}

export enum StoreAssociationStatus {
  Yes,
  No,
}

export enum StoredeletedStatus {
  Del,
  Nomal,
}

export enum ConsumeStatus {
  Consumed = 1,
  NotConsumed,
}

export enum PayStatus {
  NeedPay,
  PaySuccess,
  PayFail,
  Cancel,
  Refunded,
  REFUNDING,
  RefundedFail,
  APPLU_REFUND,
  REFUSE_REFUND,
  TO_REVIEW, //风控审核中
  UNSETTLEMENT, //不结算
  WITHDRAW, //待提现
  PLAYING, //打款中
  PLAY_SUCCESS, //打款成功
  PLAY_FAIL, //打款失败
}

export const PayStatusName = makeNameMap([
  [PayStatus.NeedPay, '待支付'],
  [PayStatus.PaySuccess, '支付成功'],
  [PayStatus.PayFail, '支付失败'],
  [PayStatus.Cancel, '已取消'],
  [PayStatus.Refunded, '已退款'],
  [PayStatus.REFUNDING, '退款中'],
  [PayStatus.RefundedFail, '退款失败'],
  [PayStatus.APPLU_REFUND, '申请退款'],
  [PayStatus.REFUSE_REFUND, '拒绝退款'],
  [PayStatus.TO_REVIEW, '风控审核中'],
  [PayStatus.UNSETTLEMENT, '不结算'],
  [PayStatus.WITHDRAW, '待提现'],
  [PayStatus.PLAYING, '打款中'],
  [PayStatus.PLAY_SUCCESS, '打款成功'],
  [PayStatus.PLAY_FAIL, '打款失败'],
]);

export enum ChannelStatus {
  XiaoXiang = 100,
  CheDianDian,
  ChengNiu,
}

export enum SourceStatus {
  Ios,
  Android,
  Wechat,
  Wap,
  Pc,
  Miniapp,
}

export enum OrderTypeStatus {
  Order = 2,
}

export enum CouponTypeStatus {
  NouseCoupon,
  UseCoupon,
}

export enum VerificationStatus {
  NoConsume,
  Consume,
}

export enum VerifydetailDateType {
  MONTH,
  TODAY,
  YESTERDAY,
  LAST_WEEK,
  LAST_MONTH,
  TIME_interval,
}

export const VerifydetailDateTypeName = makeNameMap([
  [VerifydetailDateType.TODAY, '今天'],
  [VerifydetailDateType.YESTERDAY, '昨天'],
  [VerifydetailDateType.LAST_WEEK, '上周'],
  [VerifydetailDateType.LAST_MONTH, '上月'],
]);

export interface Product {
  id?: number;
  name?: string;
  categoryId?: number;
  categoryName?: string;
  storeNo?: string;
  productNo?: string;
  channel?: ProductChannel;
  linePrice?: number;
  salePrice?: number;
  supplierPrice?: number;
  cover?: string;
  detailPic?: string;
  sequence?: string;
  status?: ProductStatus;
  saleNum?: number;
  description?: string;
  createTime?: string;
  updateTime?: string;
  deleteTime?: string;
  operator?: string;
  deletedStatus?: ProductDelStatus;
}

export interface PageSorts {
  column: string;
  asc: boolean;
}

export interface ProductCategory {
  id: number;
  name: string;
  createTime: string;
  updateTime: string;
  deleteTime: string;
  operator: string;
  deletedStatus: ProductCategoryDelStatus;
}

export interface StorePicture {
  id?: number;
  supplierStoreNo?: string;
  picName?: string;
  picUrl?: string;
  picType?: number;
  picCategory?: PicCategory;
  createTime?: string;
  updateTime?: string;
  createPerson?: string;
  updatePerson?: string;
}

export enum PicCategory {
  STOREIMAGE = 1, //门头图
  SHOWCASE = 2, // 展示柜
  STATION = 3, // 工位图
  FEATURE = 4, // 特色图
  REST = 5, // 休息图
}

export interface Store {
  id?: number;
  storeNo?: string;
  kidStoreNo?: string;
  supplierStoreNo?: string;
  merchantId?: string;
  contact?: string;
  mobile?: string;
  storeName?: string;
  phone?: string;
  thirdNo?: string;
  status?: StoreStatus;
  type?: StoreType;
  province?: string;
  provinceCode?: string;
  city?: string;
  cityCode?: string;
  area?: string;
  areaCode?: string;
  address?: string;
  storePicture?: string;
  picUrl?: Array<StorePicture>;
  picType?: number;
  channel?: StoreChannel;
  serviceType?: StoreServiceType;
  supplierName?: string;
  longitude?: number;
  latitude?: number;
  openStart?: string;
  endStart?: string;
  associationStatus?: StoreAssociationStatus;
  parentNo?: string;
  parentName?: string;
  createPerson?: string;
  createTime?: string;
  updatePerson?: string;
  updateTime?: string;
  openHoliday?: string;
  endHoliday?: string;
  holidayReason?: string;
  deletedTime?: string;
  deletedStatus?: StoredeletedStatus;
  loginPhone?: string;
  password?: string;
  openStartDate?: Date;
  endStartDate?: Date;
}

export interface StoreIncome {
  merchantId?: string;
  settlementDate?: Date;
  settlementPayedTime?: Date;
  settlementAmount?: number;
  settlementMethod?: number;
  settlementMethodName?: string;
}

export interface Order {
  appId: string;
  os: string;
  storeId: number;
  orderType: number;
  userId?: number;
  phone?: string;
  orderStatus?: number;
  verificationStatus?: ConsumeStatus;
  pageNum?: number;
  pageSize?: number;
  startTime?: string;
  endTime?: string;
}

export interface OrderResList {
  id: number;
  orderId: string;
  thirdNo: string;
  userId: number;
  orderStatus: PayStatus;
  orderStatusName: PayStatus;
  channel: ChannelStatus;
  source: SourceStatus;
  orderType: OrderTypeStatus;
  money: number;
  realMoney: number;
  storeId: number;
  storeName: string;
  productId: number;
  productName: string;
  couponType: CouponTypeStatus;
  couponId: string;
  verificationCode: string;
  verificationStatus: VerificationStatus;
  verificationStatusName: VerificationStatus;
  expireTime: string;
  orderTip: string;
  verifyTime: string;
  buyTime: string;
  payTime: string;
  payWay: string;
  payNo: string;
  applyRefundTime: string;
  refundSuccessTime: string;
  refundNo: string;
  productPrice: number;
  updateTime: string;
}

export interface OrderRes {
  endRow: number;
  firstPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  lastPage: number;
  list: OrderResList;
  navigateFirstPage: number;
  navigateLastPage: number;
  navigatePages: number;
  navigatepageNums: Array<number>;
  nextPage: number;
  pageNum: number;
  pageSize: number;
  pages: number;
  prePage: number;
  size: number;
  startRow: number;
  total: number;
}

export interface VerifyResListItem {
  id: number;
  orderId: string;
  productName: string;
  money: number;
  realMoney: number;
  supplierPrice: number;
  buyTime: string;
  payTime: string;
  verifyTime: string;
  phone: string;
}

export interface VerifyRes {
  verifyTime: string;
  num: number;
  money: number;
}

export interface VerifyDetailRes {
  orderStatus: number;
  verifyTime: string;
  productName: string;
  realMoney: number;
}

export interface Province {
  areasList?: Array<{
    area?: string;
    areaCode?: string;
  }>;
  cityList?: Array<{
    city?: string;
    cityCode?: string;
  }>;
  provinceList?: Array<{
    province?: string;
    provinceCode?: string;
  }>;
}

export enum cardTypeStatus {
  ToContrary = 1,
  Private = 2,
}

export interface BankInfoRes {
  bankName: string;
  legalPersonName: string;
  certificateNo: string;
  accountName: string;
  branchBankName: string;
  cardType: cardTypeStatus;
  accountNo: string;
  reservePhone: string;
  storePhone: string;
  storeName: string;
  companyPicture: string;
  idFront: string;
  idBack: string;
}

export enum ApplyStatus {
  on,
  success,
  fail,
}

export interface WithdrawalRecord {
  applyMoney: number;
  applyStatus: ApplyStatus;
  failRemark?: string;
  createTime: string;
}

export enum Category {
  company = 6,
  front,
  back,
}
export interface PicDto {
  picUrl: string;
  picCategory: Category;
}
