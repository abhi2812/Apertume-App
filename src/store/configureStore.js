import { createStore, combineReducers } from 'redux';
import loginReducer from '../reducers/loginReducer';
const rootReducer = combineReducers(
  { login: loginReducer }
);
const configureStore = () => {
  return createStore(rootReducer);
}
export default configureStore;