import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslics";


const appStore = configureStore({
    reducer :{
        user: userReducer,
    },
})
export default appStore;