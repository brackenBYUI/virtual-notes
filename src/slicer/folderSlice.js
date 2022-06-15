import { createSlice } from "@reduxjs/toolkit";

export const folderSlice = createSlice({
  name: "folder",
  initialState: {
    folder: null,
  },
  reducers: {
    folder: (state, action) => {
      state.folder = action.payload;
    },
  },
});

export const { folder } = folderSlice.actions;

export const selectFolders = (state) => state.folder.folder;

export default folderSlice.reducer;
