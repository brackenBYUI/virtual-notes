import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slicer/userSlice";
import folderReducer from "./slicer/folderSlice";
import noteReducer from "./slicer/noteSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    folder: folderReducer,
    note: noteReducer,
  },
});
