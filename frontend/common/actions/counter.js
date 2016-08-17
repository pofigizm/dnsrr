export const subscribe = () => (dispatch, getState, { api }) => {
  api.counter(({ name, value }) => {
    dispatch({
      type: 'COUNTER',
      name,
      value,
    })
  })
}

export const get = name => (dispatch, getState, { api }) => {
  api.get(name)
}

export const increment = name => (dispatch, getState, { api }) => {
  api.incr(name)
}

export const decrement = name => (dispatch, getState, { api }) => {
  api.decr(name)
}
