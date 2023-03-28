// import { createSlice } from "@reduxjs/toolkit";

// const authenticationSlice = createSlice({
//   name: "user",
//   initialState: null,
//   reducers: {
//     change: (state, action) => {
//       return action.payload
//     },
//   },
// });

// export const { change } = authenticationSlice.actions;

// export default authenticationSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
  name: "user",
  initialState: {
    username: null,
    image: null
  },
  reducers: {
    change: (state, action) => {
      const { username, image } = action.payload;
      state.username = username;
      state.image = image;
    },
  },
});

export const { change } = authenticationSlice.actions;

export default authenticationSlice.reducer;
