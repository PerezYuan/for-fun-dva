import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import { routerRedux } from 'dva/router';


let Router = DefaultRouter;
const { ConnectedRouter } = routerRedux;
Router = ConnectedRouter;


let routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default
      },
      {
        "path": "/shops",
        "exact": true,
        "component": require('../shops/page.js').default
      },
      {
        "path": "/users",
        "exact": true,
        "component": require('../users/page.js').default
      },
      {
        "component": () => React.createElement(require('E:/for_fun_dva/node_modules/_umi-build-dev@0.20.7@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', routes: '[{"path":"/","component":"./src\\\\layouts\\\\index.js","routes":[{"path":"/","exact":true,"component":"./src/pages/index.js"},{"path":"/shops","exact":true,"component":"./src/pages/shops/page.js"},{"path":"/users","exact":true,"component":"./src/pages/users/page.js"}]}]' })
      }
    ]
  }
];


export default function() {
  return (
<Router history={window.g_history}>
  <Route render={({ location }) =>
    renderRoutes(routes, {}, { location })
  } />
</Router>
  );
}
