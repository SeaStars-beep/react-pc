import React from 'react';
import useViewModel from './view.model';

export interface Props {
  preBg?: string;
  img: string;
  callback?: (e: any) => void;
  id?: string;
}
const Index = (props: Props) => {
  const { preBg, img } = props;
  const { handleChange } = useViewModel(props);
  const style = {
    backgroundImage: `url(${img ? img : preBg})`,
    backgroundSize: 'auto 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  return (
    <div className={'upload-wrap'}>
      <label htmlFor="upload" className={'upload-label'}>
        <input
          type="file"
          id="upload"
          className={'upload-input'}
          onChange={handleChange}
        />
        <div style={style} className={'img-show'}></div>
      </label>
    </div>
  );
};

export default Index;
