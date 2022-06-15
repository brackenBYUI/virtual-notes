import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
  name: "note",
  initialState: {
    note: null,
  },
  reducers: {
    note: (state, action) => {
      state.note = action.payload;
    },
  },
});

export const { note } = noteSlice.actions;

export const selectNotes = (state) => state.note.note;

export default noteSlice.reducer;
