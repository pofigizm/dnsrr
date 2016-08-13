import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'

import App from './containers/App'

const debug = require('debug')('frontend:common:Root')

const Root = ({
  store,
}) => {
  debug('render')

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
