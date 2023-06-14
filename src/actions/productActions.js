import { FETCH_PRODUCTS } from '../types';

export const fetchProducts = () => async (dispatch) => {
  try {
    const res = await fetch('/api/products');
    const data = await res.json();
    dispatch({
      type: FETCH_PRODUCTS,
      payload: data,
    });
  } catch (error) {
    console.log('error api');
  }
};
