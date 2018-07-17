import * as userResourcelistService from '../services/userResourcelist';

export default {
  namespace: 'userResourcelist',
  state: {
    shoplist: [],
    titlelist: [],
  },
  reducers: {
    saveShoplist(state, { payload: { shoplist } }) {
      return { ...state, shoplist };
    },
    saveTitlelist(state, { payload: { titlelist } }) {
      return { ...state, titlelist };
    },
  },
  effects: {
    *shoplist(action, { call, put }) {
      const { list } = yield call(userResourcelistService.shoplist);
      yield put({
        type: 'saveShoplist',
        payload: {
          shoplist: list,
        },
      });
    },
    *titlelist(action, { call, put }) {
      const { list } = yield call(userResourcelistService.titlelist);
      yield put({
        type: 'saveTitlelist',
        payload: {
          titlelist: list,
        },
      });
    },
    *fetch(action, { put }) {
      yield put({ type: 'shoplist'});
      yield put({ type: 'titlelist'});
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
