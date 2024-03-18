import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';

const reducer = {
  crud: counterSlice,
};

const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

