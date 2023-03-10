import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export interface TodayResult {
  symbol: string
  description?: string
  assetType?: string
  displayAssetType: string
  exchange: {
    country: {
      flagIconUrl: string
    }
  }
  assetTypeIconUrl: string
}

interface TodayState {
  query: string
  results: TodayResult[]
}


interface SearchResults {
  data: {
    instruments: TodayResult[]
  }
} 


const initialState: TodayState = {
  query: '',
  results: []
}

const todaySlice = createSlice({
  name: 'today',
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

export const { setQuery, setResults } = todaySlice.actions

export default todaySlice.reducer