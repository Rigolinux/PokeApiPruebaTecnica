import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Home,Pokemon,NotFound } from './pages'

import { PokemonProvider  } from './context/PokemonContext';
function App() {

  return (
    <div className='App'>
     <PokemonProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/pokemon/:id" element={<Pokemon />} />
            <Route path="*" element={<NotFound />} />

       
          </Routes>   
        </BrowserRouter>
     </PokemonProvider>
    </div>
  )
}

export default App
