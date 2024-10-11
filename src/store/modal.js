import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  isopen: false,
  modalitem: [],
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    openmodal(state, action) {
      state.isopen = true;
      state.modalitem = action.payload;
    },
    closemodal(state, action) {
      state.isopen = false;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
