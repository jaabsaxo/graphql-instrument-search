import React from 'react'
import './App.css'
import SearchToday from './features/today/searchToday'
import AuthField from './features/auth/AuthField'
import SearchEnhanced from './features/enhanced/searchEnhanced'
import SearchOnRoids from './features/roid/searchOnRoids'
import { useAppDispatch, useAppSelector } from "./hooks"
import { loadTokenFromLocalStorage } from './features/auth/authSlice'

function App() {
  const dispatch = useAppDispatch();
  dispatch(loadTokenFromLocalStorage());
  return (
    <div className="App">
      <div>
        <AuthField/>
      </div>
      <div className='main-wrapper'>
        <div className='sub-wrapper'>
          <p>Mobile</p>
          <SearchToday/>
        </div>
        <div className='sub-wrapper'>
          <p>Web</p>
          <SearchEnhanced/>
        </div>
        <div className='sub-wrapper'>
          <p>Native</p>
          <SearchOnRoids/>
        </div>
      </div>
    </div>
  )
}

export default App
