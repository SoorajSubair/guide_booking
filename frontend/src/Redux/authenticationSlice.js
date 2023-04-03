
import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    username: null,
    image: null
  },
  reducers: {
    change: (state, action) => {
      const { username, image, id } = action.payload;
      state.id = id;
      state.username = username;
      state.image = image;
    },
  },
});

export const { change } = authenticationSlice.actions;

export default authenticationSlice.reducer;
