import React from 'react';

type Component = React.FunctionComponent<any> | React.ComponentClass<any, any>;
export interface ScreenConfig {
  Screen: Component;
  Icon?: Component;
  SelectedIcon?: Component;
  title?: string; // title 内容
  titleBG?: string; // title 背景色
  titleFG?: string; // title 前景色

  /**
   * 是否禁用默认的NavBar。
   *
   * hideDefaultNavBar = true时，Screen应当检测 prop.inStack 以判断是否位于screenStack中
   * 若是，则Screen应自行实现后退逻辑
   */
  hideDefaultNavBar?: boolean;
}
export interface ScreenStackFragment {
  config: ScreenConfig;
  args?: any;
}

export type ScreenPusher = (config: ScreenConfig, args?: any) => void;
