import { SET_AUTHENTICATION, LOG_OUT } from '../constants';

const initialState = {
  isAuthenticated: false,
  token: ''
};

const loginReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_AUTHENTICATION:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        token: action.payload.token
      };
    case LOG_OUT:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        token: action.payload.token
      }
    default:
      return state;
  }
}
export default loginReducer;