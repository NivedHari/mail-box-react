import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "uiSlice",
  initialState: { isModalOpen: false },
  reducers: {
    toggleModal(state) {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
