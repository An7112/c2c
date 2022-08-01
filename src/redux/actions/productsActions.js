import { ActionTypes } from "../constants/action-types";

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};


export const setDataUser = (datauser) => {
  return {
    type: ActionTypes.SET_DATAUSER,
    payload: datauser,
  };
};

export const setComments = (comments) => {
  return {
    type: ActionTypes.SET_COMMENTS,
    payload: comments,
  };
};