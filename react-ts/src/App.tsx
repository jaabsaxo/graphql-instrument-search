
import './App.css'
import SearchToday from './features/today/searchToday'
import AuthField from './features/auth/AuthField'
import SearchEnhanced from './features/enhanced/searchEnhanced'
import SearchOnRoids from './features/roid/searchOnRoids'

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
          <SearchEnhanced/>
        </div>
        <div className='sub-wrapper'>
          <SearchOnRoids/>
        </div>
      </div>
    </div>
  )
}

export default App
