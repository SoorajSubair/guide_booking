import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./authenticationSlice";


const store = configureStore({
    reducer: {
        user: authenticationSlice,
    }
})

export default store