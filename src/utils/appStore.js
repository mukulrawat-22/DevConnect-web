import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslics";
import feedReducer from "./feedSlics";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});
export default appStore;
