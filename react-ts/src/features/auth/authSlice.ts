import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  token: string
}

const initialState: AuthState = { token: 'eyJhbGciOiJFUzI1NiIsIng1dCI6IkRFNDc0QUQ1Q0NGRUFFRTlDRThCRDQ3ODlFRTZDOTEyRjVCM0UzOTQifQ.eyJvYWEiOiI3Nzc3NSIsImlzcyI6Im9hIiwiYWlkIjoiMTA5IiwidWlkIjoiLWgtSERJWmxDSzZUZno3VXlPcEVNQT09IiwiY2lkIjoiLWgtSERJWmxDSzZUZno3VXlPcEVNQT09IiwiaXNhIjoiRmFsc2UiLCJ0aWQiOiIyMDAyIiwic2lkIjoiN2QwOTM2MTVjMzdmNGU3MjhlYWQyOWNmNTg2ZGJjMTQiLCJkZ2kiOiI4NCIsImV4cCI6IjE2NzI5MDgwNDciLCJvYWwiOiIxRiIsImlpZCI6ImFhOWM0Zjg0MGJiZDRhZTA0NDBhMDhkOWFiM2I5ZDFlIn0.mY8jQ2w7KPuWkXyxOc3rIzqN325xq08fgrVQ5QC85k6mnbXOV890eorIkfjuSejU1aaLit9KvIMIf6zLl5DWAg' }

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