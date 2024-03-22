import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import jobReducer from '../features/jobs/jobSlice'
import profileReducer from '../features/profile/profileSlice'
import leetcodeReducer from '../features/leetcode/leetcodeSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    profile: profileReducer,
    leetcode: leetcodeReducer,
  },
})