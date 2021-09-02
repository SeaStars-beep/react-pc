import React from 'react';
import type { ScreenConfig, ScreenStackFragment } from '@src/meta';

export const ScreenStackContext = React.createContext<{
  popScreen: () => void;
  pushScreen: (config: ScreenConfig, args?: any) => void;
  cleanScreen: (newStack: ScreenStackFragment[]) => void;
}>(null);
