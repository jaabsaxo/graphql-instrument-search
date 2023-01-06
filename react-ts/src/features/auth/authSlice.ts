import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  token: string
}

const initialState: AuthState = { token: 'eyJhbGciOiJFUzI1NiIsIng1dCI6IkRFNDc0QUQ1Q0NGRUFFRTlDRThCRDQ3ODlFRTZDOTEyRjVCM0UzOTQifQ.eyJvYWEiOiI3Nzc3NSIsImlzcyI6Im9hIiwiYWlkIjoiMTEwIiwidWlkIjoiLWgtSERJWmxDSzZUZno3VXlPcEVNQT09IiwiY2lkIjoiLWgtSERJWmxDSzZUZno3VXlPcEVNQT09IiwiaXNhIjoiVHJ1ZSIsInRpZCI6IjIwMDIiLCJzaWQiOiI4NDliMTUzZGRiYWM0NjRiOTY5ZTRjMmY3YWYwYTAyZSIsImRnaSI6IjgyIiwiZXhwIjoiMTY3MzAwMDc0MSIsIm9hbCI6IjFGIiwiaWlkIjoiYWE5YzRmODQwYmJkNGFlMDQ0MGEwOGQ5YWIzYjlkMWUifQ.e4iTC8cVK_0tNrENOMwU0m543N0CnediicPxwKJyF9fuu71h6zcHTarKPqXLg0_ZomftIb5sj_q3YUnK3rFn-Q' }

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