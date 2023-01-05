
import './App.css'
import SearchToday from './features/today/searchToday'
import AuthField from './features/auth/AuthField'

function App() {
  return (
    <div className="App">
      <div>
        <AuthField/>
      </div>
      <div className='main-wrapper'>
        <div className='sub-wrapper'>
          <SearchToday/>
        </div>
        <div className='sub-wrapper'>
          <SearchToday/>
        </div>
        <div className='sub-wrapper'>
          <SearchToday/>
        </div>
      </div>
    </div>
  )
}

export default App
