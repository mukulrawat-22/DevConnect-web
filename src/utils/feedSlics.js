import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [], // ✅ hamesha array rakhenge
  reducers: {
    addfeed: (state, action) => {
      return action.payload || []; // agar null/undefined aaya toh empty array
    },
    removeUserFromFeed: (state, action) => {
      const newFeed = state.filter((user) => user._id != action.payload);
      return newFeed;
    },
  },
});

export const { addfeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
