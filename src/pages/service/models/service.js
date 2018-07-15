import * as serviceService from '../services/service';
import { Modal } from 'antd';

export default {
  namespace: 'service',
  state: {
    list: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state, { payload: { list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { code, list, total, msg } = yield call(serviceService.fetch, { page });
      if (code === 200) {
        yield put({
          type: 'save',
          payload: {
            list,
            total,
            page: parseInt(page, 10),
          },
        });
      } else {
        Modal.error({
          title: '错误',
          content: msg,
        });
      }
    },
    *remove({ payload: id }, { call, put }) {
      const { code, msg} = yield call(serviceService.remove, id);
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
    *create({ payload: values }, { call, put }) {
      const { code, msg} = yield call(serviceService.create, values);
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
    *edit({ payload: { id, values } }, { call, put }) {
      const { code, msg} = yield call(serviceService.edit, id, values);
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
      const page = yield select(state => state.page);
      yield put({ type: 'fetch', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/service') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
