import { COUNTER_CHANGE, SET_AUTHENTICATION } from '../constants';
const initialState = {
  count: 0,
  isAuthenticated: false,
  token: ''
};
const countReducer = (state = initialState, action) => {
  switch(action.type) {
    case COUNTER_CHANGE:
      return {
        ...state,
        count:action.payload
      };
    case SET_AUTHENTICATION:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        token: action.payload.token
      }
    default:
      return state;
  }
}
export default countReducer;