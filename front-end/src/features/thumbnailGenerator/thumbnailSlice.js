import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const path = 'http://localhost:5000/items';

const initialState = {
  items: [],
  status: 'idle',
};

export const fetchItems = createAsyncThunk('thumbnail/fetchItems', async () => {
  try {
    const items = await axios.get(path);
    return items;
  } catch (error) {
    console.error(error);
  }
});

export const addItem = createAsyncThunk('thumbnail/addItem', async (item) => {
  try {
    const items = await axios.post(path, item);
    return items;
  } catch (error) {
    console.log(error);
  }
});

export const thumbnailSlice = createSlice({
  name: 'thumbnail',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload.data[0];
      })
      .addCase(addItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload.data[0];
      });
  },
});

export default thumbnailSlice.reducer;
