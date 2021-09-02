import React, { useState, useEffect } from 'react';
import { ScreenStackContext } from '../cpts/screens/context';
import type { ScreenPusher, ScreenStackFragment } from '../meta';
import type { DependencyList } from 'react';

export const useScreenLauncher = () => {
  const screenStack = React.useContext(ScreenStackContext);
  return {
    pushScreen: useCallbackReliable<ScreenPusher>(
      (config, args?) => screenStack.pushScreen(config, args),
      [screenStack],
    ),
    popScreen: useCallbackReliable(() => screenStack.popScreen(), [
      screenStack,
    ]),
    cleanScreen: useCallbackReliable(
      (newStack: ScreenStackFragment[]) => screenStack.cleanScreen(newStack),
      [screenStack],
    ),
  };
};

export function useMemoReliable<T extends (...args: any[]) => R, R = any>(
  cb: T,
  deps?: DependencyList,
): R {
  const [val, setVal] = useState<{ current?: R }>({ current: cb() });
  useEffect(() => {
    setVal({ current: cb() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return val.current;
}
export function useCallbackReliable<T extends (...args: any[]) => any>(
  cb: T,
  deps?: DependencyList,
): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemoReliable(() => cb, deps);
}

type NameMapPeer<V> = [V, string];
export function makeNameMap<V>(specs: Array<NameMapPeer<V>>) {
  return specs.reduce((cur, [key, desc]: NameMapPeer<V>) => {
    cur.set(key, desc);
    return cur;
  }, new Map<V, string>());
}

export const getSelfAppId = () => {
  let appId = '';
  const url = window.location.href;
  const urlArr = url.split('?');
  if (urlArr.length > 1) {
    const params = new URLSearchParams(urlArr[1]);
    appId = params.get('selfId');
  }
  return appId;
};
