import { combineReducers } from "redux";
import { Reducers} from "./productsReducer";
const reducers = combineReducers({
  allReducer: Reducers
});
export default reducers;
