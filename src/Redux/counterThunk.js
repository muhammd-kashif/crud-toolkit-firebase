import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Firebase/firebase-config";
import { fetchData } from "./counterSlice";

//..............ADDmodal.................
export const addModal = createAsyncThunk(
  "crud/addModal",
  async (newForm, { fulfillWithValue, rejectWithValue, dispatch }) => {
    // console.log("newForm: ", newForm);
    try {
      const response = await addDoc(collection(db, "modal"), newForm);
      // console.log('fulfillWithValue: ', fulfillWithValue);
      return fulfillWithValue([ ...newForm,  response ]);
     
    } catch (error) {
      console.log("error: ", error);
      return rejectWithValue(error.message);
    }
  }
);

// redux/slices/todoSlice.js
export const getModal = createAsyncThunk(
  "crud/getModal",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const usersCollection = collection(db, "modal");
      onSnapshot(usersCollection, (query) => {
        let queryData = [];
        for (let doc of query.docs) {
          queryData.push({ id: doc.id, ...doc.data() });
        }
        dispatch(fetchData(queryData));
      });
    } catch (error) {
      console.log("error: ", error);
      return rejectWithValue(error.message);
    }
  }
);
//............deleteModal.........................
export const deleteModal = createAsyncThunk(
  "crud/deleteModal",
  async (userId, { rejectWithValue }) => {
    try {
      const bookIssueRef = doc(db, "modal", userId);
      await deleteDoc(bookIssueRef);
      return userId;
    } catch (error) {
      console.error("Error deleting book issue:", error);
      throw error;
    }
  }
);
//.......... handleEdit.............
export const handleEdit = createAsyncThunk(
  "crud/handleEdit",
  async ( user, { fulfillWithValue, rejectWithValue, dispatch }) => {
    console.log('>>>user: ', user);
    try {
      const userRef = doc(db, "modal",user.id);
      console.log("userRef: ", userRef);
      const response = await updateDoc(userRef, {
        name: user.name,
        email: user.email,
        role:  user.role,
        address:  user.address,
      });
      console.log("Document updated successfully");
      return fulfillWithValue(response);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  }
);
