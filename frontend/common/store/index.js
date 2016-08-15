import { browserHistory } from 'react-router'
import configureStore from './configureStore'

const preloadedState = __BROWSER__ ? window.__PRELOADED_STATE__ : {} // eslint-disable-line
const store = configureStore(browserHistory, preloadedState)

export default store
