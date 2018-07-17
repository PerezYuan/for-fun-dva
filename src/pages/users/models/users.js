import * as usersService from '../services/users';
import { Modal } from 'antd';

export default {
  namespace: 'users',
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
      const { code, msg, list, total } = yield call(usersService.fetch, { page });
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
      const { code, msg } = yield call(usersService.remove, id);
      if (code === 200) {
        yield put({ type: 'reload' });
      } else {
        Modal.error({
          title: '错误',
          content: msg,
        });
      }
    },
    *edit({ payload: { id, values } }, { call, put }) {
      const { code, msg } = yield call(usersService.edit, id, values);
      if (code === 200) {
        yield put({ type: 'reload' });
      } else {
        Modal.error({
          title: '错误',
          content: msg,
        });
      }
    },
    *create({ payload: values }, { call, put }) {
      const { code, msg } = yield call(usersService.create, values);
      if (code === 200) {
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
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
          dispatch({ type: 'userResourcelist/fetch' });
        }
      });
    },
  },
};
