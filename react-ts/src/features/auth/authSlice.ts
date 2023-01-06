import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  token: string
}

const initialState: AuthState = { token: 'eyJhbGciOiJFUzI1NiIsIng1dCI6IkRFNDc0QUQ1Q0NGRUFFRTlDRThCRDQ3ODlFRTZDOTEyRjVCM0UzOTQifQ.eyJvYWEiOiI3Nzc3NSIsImlzcyI6Im9hIiwiYWlkIjoiMTA5IiwidWlkIjoiLWgtSERJWmxDSzZUZno3VXlPcEVNQT09IiwiY2lkIjoiLWgtSERJWmxDSzZUZno3VXlPcEVNQT09IiwiaXNhIjoiRmFsc2UiLCJ0aWQiOiIyMDAyIiwic2lkIjoiYTgxYTIwZTllNThlNDBhZmIzMThmNmJmNWNjZmVjMmQiLCJkZ2kiOiI4NCIsImV4cCI6IjE2NzMwOTExMjUiLCJvYWwiOiIxRiIsImlpZCI6ImFhOWM0Zjg0MGJiZDRhZTA0NDBhMDhkOWFiM2I5ZDFlIn0.BisA_NPmikt_jIUlCPsVpbRoZ_pIh0qoLmLa7H6iYi2S0aYSszgAbIOPCa32vm4bsvBfYvo8gWMp0Bs4TvxeAQ' }

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