import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],   // ✅ hamesha array rakhenge
  reducers: {
    addfeed: (state, action) => {
      return action.payload || []; // agar null/undefined aaya toh empty array
    },
    removefeed: () => {
      return []; // ✅ null ke jagah empty array
    },
  },
});

export const { addfeed, removefeed } = feedSlice.actions;
export default feedSlice.reducer;
