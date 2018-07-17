import * as shopsService from '../services/shops';
import { Modal, message } from 'antd'

export default {
  namespace: 'shops',
  state: {
    list: []
  },
  reducers: {
    save(state, { payload: { list } }) {
      return { ...state, list };
    },
  },
  effects: {
    *list(action, { call, put }) {
      const { list, code, msg } = yield call(shopsService.list);
      if (code === 200) {
        yield put({
          type: 'save',
          payload: {
            list
          },
        });
      } else {
        Modal.error({
          title: '错误',
          content: msg,
        });
      }
    },
    *get({ payload: id }, { select, call, put }) {
      const list = yield select(state => state.shops.list);
      const { data } = yield call(shopsService.get, id);
      list.filter(item => item.id === id)[0].info = data
      yield put({
        type: 'save',
        payload: {
          list: [...list],
        },
      });
    },
    *create({ payload: values }, { call, put }) {
      const { code, msg } = yield call(shopsService.create);
      if (code === 200) {
        message.success('操作成功')
        yield put({ type: 'reload' });
      } else {
        Modal.error({
          title: '错误',
          content: msg,
        });
      }
    },
    *update({ payload: { id, values } }, { call, put }) {
      const { code, msg } = yield call(shopsService.update, id, values);
      if (code === 200) {
        message.success('操作成功')
        yield put({ type: 'reload' });
        yield put({ type: 'get', payload: id });
      } else {
        Modal.error({
          title: '错误',
          content: msg,
        });
      }
    },
    *reload(action, { put, select }) {
      yield put({ type: 'list' });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/shops') {
          dispatch({ type: 'service/fetch', payload: { page: 1, limit: 100} });
          dispatch({ type: 'list' });
        }
      });
    },
  },
};
