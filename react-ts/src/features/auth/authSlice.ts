import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  token: string
}

const initialState: AuthState = { token: '0x' }

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload 
    }
  },
})

export const { setToken } = authSlice.actions

export default authSlice.reducer