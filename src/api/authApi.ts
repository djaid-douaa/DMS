import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'user'
}

interface AuthState {
  users: User[]
  currentUser: User | null
}

const initialState: AuthState = {
  users: [
    { id: '1', username: 'admin', email: 'admin@example.com', role: 'admin' },
    { id: '2', username: 'user', email: 'user@example.com', role: 'user' },
  ],
  currentUser: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
    },
    logout: (state) => {
      state.currentUser = null
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
