import React, { PropTypes } from 'react'

const Counter = ({
  counter,
  actions,
}) => {
  console.log('Counter')
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
