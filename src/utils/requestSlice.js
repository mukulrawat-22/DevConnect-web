import { createSlice } from "@reduxjs/toolkit";

const initialState = []; // start with empty array

const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    addRequest: (state, action) => action.payload, // replace state with fetched requests
    removeRequest: (state, action) => {
      const newArray = state.filter((req) => req._id !== action.payload);
      return newArray;
    },
  },
});

export const { addRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
