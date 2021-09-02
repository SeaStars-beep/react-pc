import './style.styl';
import { Wrapper } from './styled';
import React from 'react';
import useViewModel from './view.model';

export function Tpl(): JSX.Element {
  const { count, onClick } = useViewModel();
  return (
    <Wrapper>
      count={count}
      <button onClick={onClick}>点击+1</button>
    </Wrapper>
  );
}
