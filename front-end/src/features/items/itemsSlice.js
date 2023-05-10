import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const path = 'http://localhost:5000/items';

const initialState = {
  items: [],
  status: 'idle',
};

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  try {
    const payload = await axios.get(path);
    return JSON.stringify(payload);
  } catch (error) {
    console.error(error);
  }
});

export const addItem = createAsyncThunk('items/addItem', async (item) => {
  try {
    const payload = await axios.post(path, item);
    return JSON.stringify(payload);
  } catch (error) {
    console.log(error);
  }
});

export const itemsSlice = createSlice({
  name: 'itemsSlice',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = JSON.parse(action.payload).data[0].reverse();
      })
      .addCase(addItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = JSON.parse(action.payload).data[0].reverse();
      });
  },
});

export default itemsSlice.reducer;
