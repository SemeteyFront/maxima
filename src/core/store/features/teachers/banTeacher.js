import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../../http";
import { store } from '../../../store/index'
import { setBannedTeacher } from "./teachersSlice";

export const banTeacher = createAsyncThunk(
  'teacher/banTeacher',
  async function(id, {rejectWithValue}) {
    store.dispatch(setBannedTeacher(id))
    try {
      const res = await $api.post(`/users/${id}/ban`)
      return res.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)