import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Home,Pokemon,BasicForm } from './pages'

import { PokemonProvider  } from './context/PokemonContext';
function App() {

  return (
    <div className='App'>
     <PokemonProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<Pokemon />} />
            <Route path="/form" element={<BasicForm />} />
          </Routes>   
        </BrowserRouter>
     </PokemonProvider>
    </div>
  )
}

export default App
