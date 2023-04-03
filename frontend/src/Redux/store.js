import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./authenticationSlice";
import dateSlice from "./dateSlice";


const store = configureStore({
    reducer: {
        user: authenticationSlice,
        date: dateSlice,
    }
})

export default store