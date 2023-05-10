import { configureStore } from '@reduxjs/toolkit';
import itemsSlice from '../features/items/itemsSlice';

export const store = configureStore({
  reducer: {
    itemsSlice,
  },
});
