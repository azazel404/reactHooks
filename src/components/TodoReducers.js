const todoListReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return state.concat(action.payload);
    case 'SET':
      return action.payload
    case "REMOVE":
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
};

export default todoListReducer