/**
 * 全局状态管理
 */
import { observable } from 'mobx';
import palette from '@src/palette.json';
import { Store, User } from '@src/entites';
import { get as getStore } from '@src/services/store';
import { ResultCode } from '@src/services/meta';
import { useLocalObservable } from 'mobx-react';

const globalState = observable({
  palette,
  user: null as User,
  supplierStore: null as Store,

  async loadStore() {
    const ret = await getStore({
      supplierStoreId: this.user.supplierStoreId,
    });
    if (ret.data.code !== ResultCode.OK) {
      return ret;
    }
    this.supplierStore = ret.data.data;
    return ret;
  },
});

export const useStores = () =>
  useLocalObservable(() => ({
    globalState,
  }));
