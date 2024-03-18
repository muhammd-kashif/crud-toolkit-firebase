// redux/slices/todoSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { addModal, deleteModal, getModal, handleEdit } from "./counterThunk";
import { useSelector } from "react-redux";

const initialState = {
  modal: null,
  loading: false,
  error: null,
};
export const counterSlice = createSlice({
  name: "crud",
  initialState,
  reducers: {
    fetchData: (state, action) => {
      state.modal = action.payload;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addModal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addModal.fulfilled, (state, action) => {
        console.log("action: ", action);
        state.modal.push(action.payload); 
        state.loading = false;
        state.error = null;
      })
      
      .addCase(addModal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(getModal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getModal.fulfilled, (state, action) => {
        console.log('action: ', action.pay);
        state.modal = action?.payload;
        state.loading = false;
        state.error = null;
        // state.crud = state.crud.filter(doc=>doc.id !== action.payload)
      })
      .addCase(getModal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(handleEdit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleEdit.fulfilled, (state, action) => {
        console.log('action: ', action);
        // state.modal = action?.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(handleEdit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {fetchData} = counterSlice.actions;

export default counterSlice.reducer;
