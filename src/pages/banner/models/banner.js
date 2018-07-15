import * as bannerService from '../services/banner';
import { Modal } from 'antd';

export default {
  namespace: 'banner',
  state: {
    list: [],
  },
  reducers: {
    save(state, { payload: { list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *fetch(action, { call, put }) {
      const { code, list, msg } = yield call(bannerService.get);
      if (code === 200) {
        yield put({
          type: 'save',
          payload: {
            list,
          },
        });
      } else {
        Modal.error({
          title: '错误',
          content: msg,
        });
      }
    },
    *edit({ payload: { id, values } }, { call, put }) {
      const { code, msg} = yield call(bannerService.edit, id, values);
      if (code === 200) {
        Modal.success({
          title: '成功',
          content: '操作成功',
        });
        yield put({ type: 'reload' });
      } else {
        Modal.error({
          title: '错误',
          content: msg,
        });
      }
    },
    *reload(action, { put, select }) {
      yield put({ type: 'fetch' });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/banner') {
          dispatch({ type: 'fetch' });
        }
      });
    },
  },
};
