import './App.css';
import Footer from './components/UI/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home/Home'
import SearchPets from './components/pages/SearchPets/SearchPets';
import NavBar from './components/UI/NavBar';
import Pet from './components/pages/Pets/Pet';
import { useState, useEffect } from 'react'
import Main from './components/LoggedInUser/Main';
import { createContext } from 'react';
import axios from 'axios';
import Settings from './components/LoggedInUser/Settings';
import UserProfileEdit from './components/LoggedInUser/UserProfileEdit';
import MyPets from './components/LoggedInUser/MyPets';

export const Context = createContext('Default Value');

function App() {

  // Check if Logged in 
  const [loggedIn, isLoggedIn] = useState(false)


  useEffect(() => {
    axios({
      method: 'POST',
      url: 'http://localhost:8080/api/v1/users/isloggedin',
      withCredentials: true
    })

      .then(res => {
        console.log(res)
        isLoggedIn(true)
      })
      .catch(err => console.log(err.message))
  }, [])






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

            <Route path='/settings' element={<Settings />} />

            <Route path='/userProfileEdit' element={<UserProfileEdit />} />

            <Route path='/myPets' element={<MyPets/>} />



    

          </Routes>


          {/* </div> */}


        </BrowserRouter>

      </Context.Provider>


    </>

  );
}

export default App;
