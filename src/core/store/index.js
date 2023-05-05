import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import newsSlice from './features/news/newsSlice'
import teachersSlice from './features/teachers/teachersSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        news: newsSlice,
        teachers: teachersSlice,
    },
})