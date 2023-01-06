import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import todayReducer from './features/today/todaySlice'
import enhancedReducer from './features/enhanced/enhancedSlice'
import roidReducer from './features/roid/roidSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    today: todayReducer,
    enhanced: enhancedReducer,
    roid: roidReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;