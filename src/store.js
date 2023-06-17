import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { productsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducer';
import { orderReducer } from './reducers/orderReducers';

const rootReducer = combineReducers({
  products: productsReducer,
  cart:cartReducer,
  order: orderReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
