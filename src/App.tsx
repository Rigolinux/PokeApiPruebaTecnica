import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Home,About,BasicForm } from './pages'
import { Navigation } from './components'

function App() {

  return (
    <div className='App'>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/form" element={<BasicForm />} />
      </Routes>
    
    </BrowserRouter>
    </div>
  )
}

export default App
