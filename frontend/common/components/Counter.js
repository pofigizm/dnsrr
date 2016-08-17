import React, { PropTypes } from 'react'

const debug = require('debug')('frontend:common:component:Counter')

const Counter = ({
  name,
  counter,
  actions,
}) => {
  debug('render')
  return (
    <p>
      Counter "{name}" clicked: {counter} times
      {' '}
      <button onClick={() => actions.increment(name)}>+</button>
      {' '}
      <button onClick={() => actions.decrement(name)}>-</button>
    </p>
  )
}

Counter.propTypes = {
  name: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired,
}

export default Counter
