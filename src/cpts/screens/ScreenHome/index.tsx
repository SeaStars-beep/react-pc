import React from 'react';
import Screen from './Screen';
import { ScreenConfig } from '@src/meta';
import './style.styl';

export default {
  Icon: () => <strong>Home</strong>,
  SelectedIcon: () => <strong>Home</strong>,
  title: '首页',
  Screen,
} as ScreenConfig;
