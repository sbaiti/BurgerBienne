import { createStore, applyMiddleware, compose } from "redux";
import combineReducers from "../reducers";
import thunk from "redux-thunk";

let middleware = [thunk];
const store = createStore(
  combineReducers,
  {},
 compose(
    applyMiddleware(...middleware),
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
   )
);
export default store;