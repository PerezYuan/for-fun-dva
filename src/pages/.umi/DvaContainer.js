import { Component } from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';

const app = dva({
  history: window.g_history,
});
window.g_app = app;
app.use(createLoading());
app.use(require('../../plugins/onError.js').default);
app.model({ ...(require('../../pages/banner/models/banner.js').default) });
app.model({ ...(require('../../pages/service/models/service.js').default) });
app.model({ ...(require('../../pages/shops/models/shops.js').default) });
app.model({ ...(require('../../pages/users/models/userResourcelist.js').default) });
app.model({ ...(require('../../pages/users/models/users.js').default) });

class DvaContainer extends Component {
  render() {
    app.router(() => this.props.children);
    return app.start()();
  }
}

export default DvaContainer;
