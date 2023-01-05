import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export interface TodayResult {
  symbol: string
  exchange?: {
    country: {
      flagIconUrl: string
    }
  }
  assetTypeIconUrl?: string
}

interface TodayState {
  query: string
  results: TodayResult[]
}

interface SearchPayload {
  token: string,
  query: string
}

const initialState: TodayState = {
  query: 'AAPL',
  results: []
}

const todaySlice = createSlice({
  name: 'today',
  initialState: initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    searchToday: (state, action: PayloadAction<SearchPayload>) => {

      /*

      const QUERY = `
        {
          instruments(search: "AAPL") {
            symbol
          }
        }
      `;
      fetch('https://saxo-graph.deta.dev/api', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + action.payload.token
        },
        body: JSON.stringify({query: QUERY})
      }).then(r => r.json()).then(r => {console.log("result:", r)});

      */

      const mock = { "data": { "instruments": [{ "symbol": "AAPL:xnas", "exchange": { "country": { "flagIconUrl": "https://www.saxotrader.com/static/css.ashx/12.79.3/desktop/black/flags/4x3/US.svg" } }, "assetTypeIconUrl": "https://www.home.saxo/-/media/images/icons/icon-cfd-small.svg" }, { "symbol": "AAPL:xnas", "exchange": { "country": { "flagIconUrl": "https://www.saxotrader.com/static/css.ashx/12.79.3/desktop/black/flags/4x3/US.svg" } }, "assetTypeIconUrl": "https://www.home.saxo/-/media/images/icons/icon-eq-small.svg" }, { "symbol": "AAPL:xmil", "exchange": { "country": { "flagIconUrl": "https://www.saxotrader.com/static/css.ashx/12.79.3/desktop/black/flags/4x3/IT.svg" } }, "assetTypeIconUrl": "https://www.home.saxo/-/media/images/icons/icon-eq-small.svg" }, { "symbol": "AAPL:xcbf", "exchange": { "country": { "flagIconUrl": "https://www.saxotrader.com/static/css.ashx/12.79.3/desktop/black/flags/4x3/US.svg" } }, "assetTypeIconUrl": "https://www.home.saxo/-/media/images/icons/icon-listed-options-small.svg" }, { "symbol": "AAPD:xnas", "exchange": { "country": { "flagIconUrl": "https://www.saxotrader.com/static/css.ashx/12.79.3/desktop/black/flags/4x3/US.svg" } }, "assetTypeIconUrl": null }, { "symbol": "AAPU:xnas", "exchange": { "country": { "flagIconUrl": "https://www.saxotrader.com/static/css.ashx/12.79.3/desktop/black/flags/4x3/US.svg" } }, "assetTypeIconUrl": null }] } }
      
      state.results = mock.data.instruments;
    
    }
  },
})

export const { setQuery, searchToday } = todaySlice.actions

export default todaySlice.reducer