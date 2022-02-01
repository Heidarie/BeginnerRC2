import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import AuthService from "../../services/auth.service";
const user = JSON.parse(localStorage.getItem("user")) || {
  accessToken: "",
  refreshToken: "",
  userRole: "",
  userId: "",
};
if (user.userId === null) {
  user.userId = "";
  user.userRole = "";
}
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { firstName, lastName, email, phoneNumber, passwordConfirm, typeUser },
    thunkAPI
  ) => {
    try {
      const response = await AuthService.registerUser(
        firstName,
        lastName,
        email,
        phoneNumber,
        passwordConfirm,
        typeUser,
        typeUser
      );

      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const registerEmployer = createAsyncThunk(
  "auth/registerEmployer",
  async ({ name, email, phoneNumber, passwordConfirm, typeUser }, thunkAPI) => {
    try {
      const response = await AuthService.registerEmployer(
        name,
        email,
        phoneNumber,
        passwordConfirm,
        typeUser
      );

      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password);
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const initialState =
  user.userId !== ""
    ? { isLoggedIn: true, user }
    : {
        isLoggedIn: false,
        user: {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          userRole: "",
          userId: "",
        },
      };
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [registerUser.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [registerEmployer.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [registerEmployer.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
