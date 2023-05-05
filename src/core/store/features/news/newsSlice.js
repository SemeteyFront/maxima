import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setPending, setRejected } from "../statusData";
import $api from "../../../http";

export const getNews = createAsyncThunk (
  'get/getNews',
  async function(_, {rejectWithValue}) {
    try {
      const data = await $api.get('/news')
      return await data.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addNews = createAsyncThunk(
  'add/addNews',
  async function(news, {rejectWithValue}) {
    try {
      const data = await $api.post('/news', news)
      return await data.data
    } catch (error) {
      return rejectWithValue(error.message)
    } 
  }
)

export const deleteNews = createAsyncThunk(
  'delete/deleteNews',
  async function(id, {rejectWithValue}) {
    try {
      await $api.delete(`/news/${id}`)
      return id
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const ChangeNews = createAsyncThunk(
  'change/ChangeNews',
  async function(obj, {rejectWithValue}) {
    try {
      const res = await $api.put(`/news/${obj.id}`, obj.data)
      return res.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const getImage = createAsyncThunk(
  'img/getImage',
  async function(formData, {rejectWithValue}) {
    try {
      const res = await $api.post('/files', formData,{
        headers: {
          "Content-Type": "multipart/form-data ",
        }
      })
      return res.data[0]
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const newsSlice  = createSlice({
  name: 'control',
  initialState: {
    getImg: null,
    data: [],
    editNews: null,
    status: null,
    error: null
  },
  reducers: {
    EditNewsById: (state, action) => {
      state.editNews = state.data.find(news => news.id === action.payload)
    }
  },
  extraReducers: {
    [getNews.fulfilled]: (state, action) => {
      state.status = 'fulfilled'
      state.data = [...action.payload.data]
    },
    [addNews.fulfilled]: (state, action) => {
      state.status = 'fulfilled'
      state.data = [action.payload, ...state.data]
    },
    [deleteNews.fulfilled]: (state, action) => {
      state.status = 'fulfilled'
      state.data = state.data.filter(deleteNews => deleteNews.id !== action.payload)
    },
    [ChangeNews.fulfilled]: (state, action) => {
      state.status = 'fulfilled'
      state.data = state.data.filter(deleteNews => deleteNews.id !== action.payload)
    },
    [getImage.fulfilled]: (state, action) => {
      state.status = 'fulfilled'
      state.getImg = action.payload
    },

    [addNews.pending]: setPending,
    [getNews.pending]: setPending,
    [deleteNews.pending]: setPending,
    [ChangeNews.pending]: setPending,
    [getImage.pending]: setPending,

    [getNews.rejected]: setRejected,
    [addNews.rejected]: setRejected,
    [deleteNews.rejected]: setRejected,
    [ChangeNews.rejected]: setRejected,
    [getImage.rejected]: setRejected,
  }
})

export default newsSlice.reducer
export const { EditNewsById } = newsSlice.actions