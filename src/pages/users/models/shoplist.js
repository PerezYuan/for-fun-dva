import * as shoplistService from '../services/shoplist';

export default {
  namespace: 'shoplist',
  state: {
    shoplist: [],
  },
  reducers: {
    save(state, { payload: { shoplist } }) {
      return { ...state, shoplist };
    },
  },
  effects: {
    *fetch(action, { call, put }) {
      const { list } = yield call(shoplistService.fetch);
      yield put({
        type: 'save',
        payload: {
          shoplist: list,
        },
      });
    }
  },
  subscriptions: {
    // setup({ dispatch, history }) {
    //   return history.listen(({ pathname, query }) => {
    //     if (pathname === '/users') {
    //       dispatch({ type: 'fetch' });
    //     }
    //   });
    // },
  },
};
