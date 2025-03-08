import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import authReducer from './slices/authSlice' // If you also have auth
import documentReducer from './slices/documentSlice'; // Ensure this is imported

export const store = configureStore({
  reducer: {
    users: userReducer, // ✅ This should exist
    auth: authReducer,  // If needed
    documents: documentReducer, // Ensure this is here

  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
