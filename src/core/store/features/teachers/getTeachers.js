import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../../http";

export const getTeachers = createAsyncThunk(
  'teachers/getTeachers',
  async function(_, {rejectWithValue}) {
    try {
      const res = await $api.get('/users/teachers/info')
      return res.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)