import React from 'react';
import { Tabs, Modal, DatePicker } from 'antd-mobile';
import closedPNG from '@assets/images/closed.png';
import leftPNG from '@assets/images/left.png';
import right2PNG from '@assets/images/right2.png';
import { useErrorBoundary } from 'use-error-boundary';
import { VerifydetailDateType, PayStatus } from '@src/entites';
import useViewModel, { Props } from './view.model';

const state = [
  { title: '全部', status: -1 },
  { title: '打款中', status: PayStatus.PLAYING },
  { title: '打款失败', status: PayStatus.PLAY_FAIL },
  { title: '风控审核中', status: PayStatus.TO_REVIEW },
  { title: '待提现', status: PayStatus.WITHDRAW },
  { title: '已打款', status: PayStatus.PLAY_SUCCESS },
  { title: '不结算', status: PayStatus.UNSETTLEMENT },
];

const times = [
  { title: '今天', status: VerifydetailDateType.TODAY },
  { title: '昨天', status: VerifydetailDateType.YESTERDAY },
  { title: '上周', status: VerifydetailDateType.LAST_WEEK },
  { title: '上月', status: VerifydetailDateType.LAST_MONTH },
];

const tabs = [{ title: '时间' }, { title: '时间区间' }];

export const Sifting = (props: Props) => {
  const { showModal, onClosePopClick, getDateType, getOrderStatus, handleTab } =
    props ?? {};
  const {
    handleStartTime,
    handleEndTime,
    handleReset,
    getSearch,
    handleClosePopClick,
    startTime,
    endTime,
    dateTypeStatus,
    orderStatusTpye,
  } = useViewModel(props);
  const { ErrorBoundary, didCatch, error, reset } = useErrorBoundary();
  return (
    <>
      {didCatch ? (
        <p>请将当前错误截图给产品经理: {error.message}</p>
      ) : (
        <ErrorBoundary>
          <Modal
            popup
            visible={showModal}
            onClose={handleClosePopClick}
            animationType="slide-up"
          >
            <div className={'modal-header'}>
              <div className={'modal-header-title'}>全部筛选</div>
              <img
                src={closedPNG}
                style={{ width: 14, height: 14 }}
                className={'modal-header-img'}
                onClick={handleClosePopClick}
              />
            </div>

            <div className={'modal-content'}>
              <div className={'modal-state'}>
                <div className={'modal-state-title'}>状态</div>
                <div className={'modal-state-main'}>
                  {state.map((item, index) => (
                    <div
                      className={`modal-state-main-list ${
                        item.status === orderStatusTpye
                          ? 'modal-state-main-list-click'
                          : 'modal-state-main-list-noclick'
                      }`}
                      key={index}
                      onClick={() => getOrderStatus(item.status)}
                    >
                      <div className={'order-description'}>{item.title}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={'modal-tabs'}>
                <Tabs
                  tabs={tabs}
                  initialPage={0}
                  onTabClick={(tab) => {
                    handleTab(tab);
                  }}
                >
                  <div className={'modal-time'}>
                    <div className={'modal-time-main'}>
                      {times.map((item, index) => (
                        <div
                          className={`modal-time-main-list ${
                            item.status === dateTypeStatus
                              ? 'modal-time-main-list-click'
                              : 'modal-time-main-list-noclick'
                          }`}
                          key={index}
                          onClick={() => getDateType(item.status)}
                        >
                          <div className={'order-description'}>
                            {item.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={'modal-time-interval'}>
                    <DatePicker
                      mode="date"
                      title="开始时间"
                      extra="Optional"
                      onOk={handleStartTime}
                    >
                      <div className={'modal-time-interval-button'}>
                        {startTime}
                      </div>
                    </DatePicker>
                    <div className={'modal-time-interval-divider'}></div>
                    <DatePicker
                      mode="date"
                      title="截至日期"
                      extra="Optional"
                      onOk={handleEndTime}
                    >
                      <div className={'modal-time-interval-button'}>
                        {endTime}
                      </div>
                    </DatePicker>
                  </div>
                </Tabs>
              </div>

              <div className={'modal-handle'}>
                <div className={'modal-handleall'}>
                  <div
                    style={{
                      backgroundImage: `url(${leftPNG})`,
                      color: '#1676FF',
                    }}
                    onClick={handleReset}
                    className={'modal-handle-main'}
                  >
                    重置
                  </div>
                  <div
                    style={{
                      backgroundImage: `url(${right2PNG})`,
                      color: '#FFFFFF',
                    }}
                    className={'modal-handle-main'}
                    onClick={getSearch}
                  >
                    查询
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </ErrorBoundary>
      )}
    </>
  );
};
