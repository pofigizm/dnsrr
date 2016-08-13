import React, { PropTypes } from 'react'

const debug = require('debug')('frontend:common:component:Counter')

const Counter = ({
  counter,
  actions,
}) => {
  debug('render')
  return (
    <p>
      Clicked: {counter} times
      {' '}
      <button onClick={actions.increment}>+</button>
      {' '}
      <button onClick={actions.decrement}>-</button>
    </p>
  )
}

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired,
}

export default Counter
