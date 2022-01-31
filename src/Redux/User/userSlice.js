import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      accessToken: "",
      refreshToken: "",
      userRole: "",
      userId: "",
    },
  },
  reducers: { login: (state, action) => {} },
});
