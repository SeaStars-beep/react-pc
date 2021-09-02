import React from 'react';
import { Button } from 'antd-mobile';
import useViewModel, { ViewModelCoifng } from './view.model';
import siftingPNG from '@assets/images/sifting.png';
import rightPNG from '@assets/images/right.png';
import { useErrorBoundary } from 'use-error-boundary';
import { Sifting } from './cpts/Sifting/index';
import { PayStatusName, PayStatus } from '@src/entites';

export default (props: ViewModelCoifng) => {
  const {
    orderMonthInfo,
    dateType,
    orderStatus,
    total,
    showModal,
    barStatus,
    barTime,
    totalMoney,
    onClosePopClick,
    onShowPopClick,
    getDateType,
    getOrderStatus,
    getTimeInterval,
    getStartTime,
    getEndTime,
    handleSearch,
    handleTab,
    naviToScreenBankInfo,
  } = useViewModel(props);

  return (
    <>
      <div className={'screen-orders-detail'}>
        <div className={'head-bar'}>
          <div>{barStatus}</div>
          <div className={'head-bar-time'}>{barTime}</div>
          <div onClick={onShowPopClick}>
            筛选
            <img src={siftingPNG} />
          </div>
        </div>

        <div className={'main'}>
          <div className={'remind'} onClick={naviToScreenBankInfo}>
            <div className={'remind-detail'}>
              如果打款失败请核对收款信息是否正确，
            </div>
            <div className={'color6FF lh27.5'}>点击核对</div>
            <img
              src={rightPNG}
              className={'ml5'}
              style={{ width: 5.5, height: 10 }}
            />
          </div>

          <div className={'number'}>
            <div style={{ fontSize: 17, color: '#FE1300', fontWeight: 600 }}>
              {total}笔
            </div>
            <div style={{ fontSize: 17, color: '#FE1300', fontWeight: 600 }}>
              ¥{totalMoney}
            </div>
          </div>

          {orderMonthInfo &&
            orderMonthInfo.map((item, index) => (
              <div className={'order-item'} key={index}>
                <div className={'order-description top'}>
                  <div className={'order-title'}>{item.productName}</div>
                  <div
                    className={`order-status ${
                      item.orderStatus === PayStatus.WITHDRAW ||
                      item.orderStatus === PayStatus.TO_REVIEW
                        ? 'color6FF'
                        : item.orderStatus === PayStatus.UNSETTLEMENT ||
                          item.orderStatus === PayStatus.PLAY_SUCCESS
                        ? 'color300'
                        : item.orderStatus === PayStatus.PLAYING
                        ? 'colorA27'
                        : 'color190'
                    }`}
                  >
                    {PayStatusName.get(item.orderStatus)}
                  </div>
                </div>
                <div className={'order-description bottom'}>
                  <div className={'order-time'}>
                    {`核销时间：${item.verifyTime}`}
                  </div>
                  <div className={'order-price'}>¥{item.realMoney}</div>
                </div>
              </div>
            ))}
        </div>

        <Sifting
          showModal={showModal}
          dateType={dateType}
          orderStatus={orderStatus}
          onClosePopClick={onClosePopClick}
          getDateType={getDateType}
          getOrderStatus={getOrderStatus}
          getTimeInterval={getTimeInterval}
          getStartTime={getStartTime}
          getEndTime={getEndTime}
          handleSearch={handleSearch}
          handleTab={handleTab}
        ></Sifting>
      </div>
    </>
  );
};
