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

    const newData = payload.data.map((item) => {
      const { file, url } = item;
      return { ...item, url, file: { ...file, buffer: file.buffer.data } };
    });

    return JSON.stringify({ ...payload, data: newData });
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

    console.log(payload);

    const newData = payload.data.map((item) => {
      const { file } = item;
      return { ...item, file: { ...file, buffer: file.buffer.data } };
    });

    return JSON.stringify({ ...payload, data: newData });
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
        state.items = JSON.parse(action.payload).data.reverse();
      });
  },
});

export default itemsSlice.reducer;
