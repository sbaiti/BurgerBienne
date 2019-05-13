import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import SliderReducer from "./SliderReducer";

export default combineReducers({
  auth: AuthReducer,
  slider: SliderReducer
});