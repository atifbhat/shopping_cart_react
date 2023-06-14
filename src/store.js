import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { productsReducer } from './reducers/productReducers';

const rootReducer = combineReducers({
  products: productsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
