import './style.styl';

import React from 'react';
import useViewModel from './view.model';

export function Tpl(): JSX.Element {
  const { count, onClick } = useViewModel();
  return (
    <div className={'tpl'}>
      count={count}
      <button onClick={onClick}>点击+1</button>
    </div>
  );
}
