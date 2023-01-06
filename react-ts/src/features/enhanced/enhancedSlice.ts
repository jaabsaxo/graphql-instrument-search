import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export interface EnhancedResult {
  symbol: string
  description?: string
  assetType?: string
  exchange: {
    country: {
      flagIconUrl: string
    }
    mic: string
    name: string
    state: string
    open: string
    nextState: string
    nextStateHours: string
    nextStateMins: string
    until: string
  }
  assetTypeIconUrl: string
}

interface EnhancedState {
  query: string
  results: EnhancedResult[]
}

interface SearchResults {
  results: EnhancedResult[]
}

const initialState: EnhancedState = {
  query: '',
  results: []
}

const enhancedSlice = createSlice({
  name: 'enhanced',
  initialState: initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    setResults: (state, action: PayloadAction<SearchResults>) => {
      state.results = action.payload.data.instruments
    }
  },
})

export const { setQuery, setResults } = enhancedSlice.actions

export default enhancedSlice.reducer