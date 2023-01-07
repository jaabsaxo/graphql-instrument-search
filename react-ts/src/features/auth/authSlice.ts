import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  token?: string
}

const initialState: AuthState = { token: '' }

const LOCAL_STORAGE_KEY = "graphql-instrument-token"

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    loadTokenFromLocalStorage: (state) => {
      let token = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (token) {
        state.token = token 
      }
    },
    setToken: (state, action: PayloadAction<string>) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, action.payload )
      state.token = action.payload 
    }
  },
})

export const { setToken, loadTokenFromLocalStorage } = authSlice.actions

export default authSlice.reducer