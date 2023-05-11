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
    const formData = new FormData();
    const { fileData } = item;

    formData.append('file', { ...fileData[0] });
    const data = { ...item };

    const payload = await axios.post(path, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // const payload = await axios.post(path, data);
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
        state.items = JSON.parse(action.payload).data.reverse();
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
