
const counter = (state = {}, action) => {
  switch (action.type) {
    case 'COUNTER':
      return {
        ...state,
        [action.name]: action.value,
      }
    default:
      return state
  }
}

export default counter
