import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "idle",
};

export const fetchItems = createAsyncThunk("thumbnail/fetchItems", async () => {
  //do stuff

  return null;
});

export const addItem = createAsyncThunk("thumbnail/addItem", async (item) => {
  //do stuff

  return null;
});

export const thumbnailSlice = createSlice({
  name: "thumbnail",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "idle";
        state.items += action.payload;
      })
      .addCase(addItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items += [action.payload, ...state.items];
      });
  },
});

export default thumbnailSlice.reducer;
