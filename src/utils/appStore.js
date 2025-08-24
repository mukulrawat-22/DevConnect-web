import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslics";
import feedReducer from "./feedSlics";
import { connect } from "react-redux";
import connectionReducer from "./connectionSlice";
import  requestReducer  from "./requestSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    requests: requestReducer,
  },
});
export default appStore;
