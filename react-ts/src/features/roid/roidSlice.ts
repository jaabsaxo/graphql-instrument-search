import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export interface RoidResult {
  symbol: string
  description?: string
  assetType?: string
  displayAssetType: string
  exchange: {
    country: {
      flagIconUrl: string
    }
    mic: string
    name: string
    state: string
    open: string
    nextState: string
    nextStateRemaining: string
    until: string
  }
  assetTypeIconUrl: string
  sparkLine: number[]
  positionInfo: {
    exposureCurrency: string
    positionExposure: number
    numPositions: number
  }
}

interface RoidState {
  query: string
  results: RoidResult[]
}

interface SearchResults {
    data: {
      instruments: RoidResult[]
    }
} 

const initialState: RoidState = {
  query: '',
  results: []
}

const roidSlice = createSlice({
  name: 'roid',
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

export const { setQuery, setResults } = roidSlice.actions

export default roidSlice.reducer