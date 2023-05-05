import { createSlice } from "@reduxjs/toolkit";
import { setPending, setRejected } from "../statusData";
import { getTeachers } from "./getTeachers";
import { addTeacher } from "./addTeacher";
import { banTeacher } from "./banTeacher";

const teacherSlice = createSlice({
  name: 'teachers',
  initialState: {
    teachers: [],
    status: null,
    error: null,
    isOpen: false,
    bannedTeacherId: null,
  },
  reducers: {
    openModal: (state) => {
      state.isOpen = !state.isOpen
    },
    setBannedTeacher: (state, action) => {
      state.bannedTeacherId = action.payload
    }
  },
  extraReducers: {
    [getTeachers.fulfilled]: (state, action) => {
      state.status = 'fulfilled'
      state.teachers = [action.payload]
    },
    [addTeacher.fulfilled]: (state, action) => {
      state.status = 'fulfilled'
      state.teachers = [...action.payload, ...state.teachers]
    },
    [banTeacher.fulfilled]: (state) => {
      state.status = 'fulfilled'
      const currentId = state.teachers[0].data.findIndex((teacher) => teacher.id === state.bannedTeacherId)
      state.teachers[0].data[currentId].state = 'BANNED'
    },

    [getTeachers.pending]: setPending,
    [addTeacher.pending]: setPending,
    [banTeacher.pending]: setPending,

    [getTeachers.rejected]: setRejected,
    [addTeacher.rejected]: setRejected,
    [banTeacher.rejected]: setRejected,
  }
})

export default teacherSlice.reducer
export const { openModal, setBannedTeacher } = teacherSlice.actions
