import * as shopsService from '../services/shops';

export default {
  namespace: 'shops',
  state: {
    list: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state, { payload: { list } }) {
      return { ...state, list };
    },
  },
  effects: {
    *list(action, { call, put }) {
      const { list } = yield call(shopsService.list);
      console.log(list)
      yield put({
        type: 'save',
        payload: {
          list,
        },
      });
    },
    *get({ payload: id }, { select, call, put }) {
      const list = yield select(state => state.shops.list);
      const { data } = yield call(shopsService.get, id);
      list[id - 1].info = data
      yield put({
        type: 'save',
        payload: {
          list: [...list],
        },
      });
    },
    *remove({ payload: id }, { call, put }) {
      yield call(shopsService.remove, id);
      yield put({ type: 'reload' });
    },
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(shopsService.patch, id, values);
      yield put({ type: 'reload' });
    },
    *create({ payload: values }, { call, put }) {
      yield call(shopsService.create, values);
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/shops') {
          dispatch({ type: 'list' });
        }
      });
    },
  },
};
