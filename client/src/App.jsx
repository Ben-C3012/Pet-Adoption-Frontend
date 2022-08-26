import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home/Home'
import SearchPets from './components/pages/SearchPets/SearchPets';
import NavBar from './components/UI/NavBar';
import Pet from './components/pages/Pets/Pet';
import { useState, useEffect } from 'react'
import Profile from './components/pages/Profile/Profile';
import Main from './components/LoggedInUser/Main';
import { createContext } from 'react';
import axios from 'axios';
import Settings from './components/LoggedInUser/Settings';

export const Context = createContext('Default Value');

function App() {

  // Check if Logged in 
  const [loggedIn, isLoggedIn] = useState(false)



  return (
    <>

      <Context.Provider value={{ loggedIn, isLoggedIn }}>

        <BrowserRouter>
          {/* <div className="App"> */}
          <NavBar />


          <Routes>

            <Route path='/' element={<Home />} />

            <Route path='/pets' element={<SearchPets />} />

            <Route path='/pet/' element={<Pet />} />


            {/* Logged In */}


            <Route path='/main' element={<Main />} />

            <Route path='/profile' element={<Profile />} />

            <Route path='/settings' element={<Settings />} />


          </Routes>

          {/* </div> */}


        </BrowserRouter>

      </Context.Provider>


    </>

  );
}

export default App;
