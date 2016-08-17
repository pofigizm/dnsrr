import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { AppContainer } from 'react-hot-loader'

import routes from '../common/routes'

const debug = require('debug')('frontend:client:Root')

const RootComponent = ({
  store,
  history,
}) => {
  debug('render')

  return (
    <Provider store={store}>
      <Router routes={routes(store)} history={history} />
    </Provider>
  )
}

RootComponent.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

const root = (store, history) => (
  <AppContainer>
    <RootComponent {...{ store, history }} />
  </AppContainer>
)

export default root
