import type { Props } from './index';
import { Modal } from 'antd-mobile';

const alert = Modal.alert;
const useViewModel = (props: Props) => {
  const { callback } = props;

  const handleChange = (e: any) => {
    try {
      const [file] = e?.target?.files;
      const { name = '' } = file;
      const reg = /.(jpg|png|jpeg)$/;
      if (!reg.test(name)) {
        alert('', '文件类型只能是png、jpg、jpeg格式');
        return;
      }
      callback(file);
    } catch (err) {
      alert('', '系统错误请重新上传');
    }
  };
  return {
    handleChange,
  };
};

export default useViewModel;
