import { getCurrentUser, getDataUser } from "../../Component/Auth/Services/AuthService";
import { ActionTypes } from "../constants/action-types";
const intialState = {
  products: [],
  user: getCurrentUser(),
  datauser: [],
  comments:[]
};
export const Reducers = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: payload };
    case ActionTypes.SET_DATAUSER:
      return {...state, datauser: payload}
    case ActionTypes.SET_COMMENTS:
      return {...state, comments: payload}
    default:
      return state;
  }
};
