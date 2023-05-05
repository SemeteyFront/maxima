import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../../http";

export const addTeacher = createAsyncThunk(
  'teacher/addTeacher',
  async function(data, {rejectWithValue}) {
    try {
      console.log(data);
      const res = await $api.post('/confirm/PARTNER/TEACHER', data)
      return res.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)