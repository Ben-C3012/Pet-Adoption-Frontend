import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home/Home'
import Pets from './components/pages/Pets/Pets';

function App() {
  return (
    <>

      <BrowserRouter>
        <div className="App">
      

          <Routes>
   
            <Route path='/' element={<Home />}/>

            <Route path='/pets' element = {<Pets/> }    />

          </Routes>


        </div>
      </BrowserRouter>
    </>

  );
}

export default App;
