import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Toast } from 'antd-mobile';

interface Props {
  title: string;
  content: string;
  copy?: boolean;
}

export const InfoLine = (props: Props) => {
  const { title, content, copy = false } = props;
  return (
    <div className={'info-line'}>
      <div className={'front'}>
        <div className={'title-content'}>
          <p className={'title-text'}>{`${title}`}</p>
        </div>
        <p className={'content-text'}>{`${content}`}</p>
      </div>
      {copy && (
        <div className={'backend'}>
          <div className={'copy'}>
            <CopyToClipboard
              text={`${content}`}
              onCopy={() => {
                Toast.success('复制成功', 1);
              }}
            >
              <p>复制</p>
            </CopyToClipboard>
          </div>
        </div>
      )}
    </div>
  );
};
