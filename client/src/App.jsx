import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home/Home'
import SearchPets from './components/pages/SearchPets/SearchPets';
import NavBar from './components/UI/NavBar';
import Pet from './components/pages/Pets/Pet';

function App() {
  return (
    <>

      <BrowserRouter>
        <div className="App">
          <NavBar />

          <Routes>

            <Route path='/' element={<Home />} />

            <Route path='/pets' element={<SearchPets />} />

            <Route path='/pet/' element={<Pet />} />

          </Routes>


        </div>
      </BrowserRouter>
    </>

  );
}

export default App;
