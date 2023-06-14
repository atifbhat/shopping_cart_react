import { FETCH_PRODUCTS } from '../types';

const initialState = {
  items: [],
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, items: action.payload };
    default:
      return state;
  }
};
