import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home/Home'
// import Pets from './components/pages/Pets/Pets';
import NavBar from './components/UI/NavBar';
import SearchPets from './components/pages/SearchPets/SearchPets';

function App() {
  return (
    <>

      <BrowserRouter>
        <div className="App">
          <NavBar />

          <Routes>

            <Route path='/' element={<Home />} />

            <Route path='/pets' element={<SearchPets />} />

          </Routes>


        </div>
      </BrowserRouter>
    </>

  );
}

export default App;
