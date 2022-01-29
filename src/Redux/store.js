import { configureStore } from "@reduxjs/toolkit";
import offerReducer from "./Offers/offerSlice";
import authReducer from "./User/auth";
import messageReducer from "./User/message";

export default configureStore({
  reducer: {
    offers: offerReducer,
    auth: authReducer,
    message: messageReducer,
    devTools: true,
  },
});
