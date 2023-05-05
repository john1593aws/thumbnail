import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const path = 'http://localhost:5000/items';

const initialState = {
  items: [],
  status: 'idle',
};

export const fetchItems = createAsyncThunk('thumbnail/fetchItems', async () => {
  console.log('yo yo');
  try {
    const items = await axios.get(path);
    console.log({ items });
    return items;
  } catch (error) {
    console.log(error);
  }
});

export const addItem = createAsyncThunk('thumbnail/addItem', async (item) => {
  try {
    await axios.post(path, item);
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
      });
  },
});

export default thumbnailSlice.reducer;
