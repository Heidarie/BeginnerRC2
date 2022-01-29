import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchAsyncOffers = createAsyncThunk(
  "offers/fetchOffers",
  async () => {
    const response = await axios.get(
      "https://localhost:44310/Offer/GetAllOffers"
    );
    return response.data;
  }
);

const initialState = {
  offers: [],
  loading: true,
  error: false,
  selectedOffer: 0,
  isActiveSelected: false,
  tempoffer: {
    description: [],
    detailToSend: "",
  },
  hasNextPage: false,
};

export const offerSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    setSelectedOffer: (state, action) => {
      state.isActiveSelected =
        action.payload !== state.selectedOffer
          ? (state.isActiveSelected = true)
          : !state.isActiveSelected;
      state.selectedOffer = action.payload;
      //NIE DOTYKA TU IFA ZAPYTANIE
    },
    addoffer: (state, action) => {
      state.tempoffer.description = action.payload;
    },
    hasNextPage: (state, action) => {},
  },
  extraReducers: {
    [fetchAsyncOffers.pending]: (state) => {
      console.log("Pending");
      return { ...state, loading: true, error: false };
    },
    [fetchAsyncOffers.fulfilled]: (state, { payload }) => {
      console.log("Fetched Succesfully");
      return { ...state, error: false, loading: false, offers: payload };
    },
    [fetchAsyncOffers.rejected]: () => {
      console.log("Rejected");
      return {
        loading: false,
        error: true,
      };
    },
    setSelectedOffer: (state, { payload }) => {
      state.selectedOffer = payload;
    },
  },
});

export const { setSelectedOffer } = offerSlice.actions;
export const getAllOffers = (state) => state.offers;
export const getSelectedOffer = (state) => state.selectedOffer;
export default offerSlice.reducer;
