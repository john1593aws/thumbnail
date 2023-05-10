import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import itemsSlice from '../features/items/itemsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    itemsSlice,
  },
});
