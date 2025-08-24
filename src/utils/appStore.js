import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslics";
import feedReducer from "./feedSlics";
import { connect } from "react-redux";
import connectionReducer from "./connectionSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer
  },
});
export default appStore;
