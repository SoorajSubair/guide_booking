import { createSlice } from "@reduxjs/toolkit";


const dateSlice = createSlice({
    name: "user",
    initialState: {
        selectedDate: null,
      },
      reducers: {
        setSelectedDate(state, action) {
          state.selectedDate = new Date(action.payload);
        },
      },
})

export const { setSelectedDate } = dateSlice.actions;

export default dateSlice.reducer;