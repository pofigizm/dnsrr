
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'COUNTER':
      return action.value
    default:
      return state
  }
}

export default counter
