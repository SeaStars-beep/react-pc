import { Wrapper } from './styled';
import React from 'react';
import { IconFont } from '@src/common-cpts/IconF/meta';

export function IconF(props: {
  type: IconFont;
  className?: string;
  onClick?: (e: React.SyntheticEvent) => void;
}): JSX.Element {
  const { type: iconfontType, className, onClick } = props;
  return (
    <Wrapper
      onClick={onClick}
      className={`iconfont ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: `&#x${iconfontType};` }}
    />
  );
}
