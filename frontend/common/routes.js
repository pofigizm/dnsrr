import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import App from './containers/App'
import NotFound from './components/NotFound'

const routes = (
  <Route path="/" >
    <Route path="/counter/:name" component={App} />
    <IndexRedirect to="/counter/one" />
    <Route path="/*" component={NotFound} />
  </Route>
)

export default routes
