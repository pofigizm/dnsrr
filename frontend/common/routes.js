import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import { get } from './actions/counter'
import App from './containers/App'
import NotFound from './components/NotFound'

const run = (store, action, pr) => ({ params }) => store.dispatch(action(params[pr]))

const routes = store => (
  <Route path="/" >
    <Route path="/counter/:name" component={App} onEnter={run(store, get, 'name')} />
    <IndexRedirect to="/counter/one" />
    <Route path="/*" component={NotFound} />
  </Route>
)

export default routes
