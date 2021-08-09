const filterReducer = (state = '', action) => {
  switch (action.type) {
    case '@filter/change':
      return action.filter
    default:
      return state
  }
}

const filterChange = filter => {
  return {
    type: '@filter/change',
    filter
  }
}

export default filterReducer
export { filterChange }
