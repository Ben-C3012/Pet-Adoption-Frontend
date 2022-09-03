import './App.css';
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
import NotFound from './components/pages/NotFoundPage/NotFound';
import AddPet from './components/AdminPages/AddPet';
import Dashboared from './components/AdminPages/Dashboared';
import UserProfile from './components/AdminPages/UserProfile';
import RequireAuth from './components/pages/RequireAuth';
import RequireAdmin from './components/pages/RequireAdmin';
export const Context = createContext('Default Value');

function App() {

  // Check if Logged in 
  const [loggedIn, isLoggedIn] = useState(false)
  const [admin, isAdmin] = useState(false)
  const [userId, setUserId] = useState('')


  useEffect(() => {
    axios({
      method: 'POST',
      url: 'http://localhost:8080/api/v1/users/isloggedin',
      withCredentials: true
    })

      .then(res => {
        isLoggedIn(true)
        setUserId(res.data.user._id)

      })
      .catch(err => console.log(err.message))
  }, [])






  return (
    <>

      <Context.Provider value={{ loggedIn, isLoggedIn, admin, isAdmin, userId }}>



        <BrowserRouter>

          <NavBar />


          <Routes>

            <Route path='/' element={<Home />} />

            <Route path='/pets' element={<SearchPets />} />

            <Route path='/pet/' element={<Pet />} />


            {/* Logged In */}


            <Route path='/main' element={<Main />} />

            <Route path='/settings' element={<RequireAuth> <Settings /></RequireAuth>} />

            <Route path='/userProfileEdit' element={<RequireAuth> <UserProfileEdit /> </RequireAuth>} />

            <Route path='/myPets' element={<RequireAuth> <MyPets /> </RequireAuth>} />


            {/* Admin Pages */}

            <Route path='/addPet' element={<RequireAdmin> <AddPet /> </RequireAdmin>} />

            <Route path='/dashboared' element={<RequireAdmin> <Dashboared /> </RequireAdmin>} />

            {/* Not In App */}
            <Route path='/user' element={<UserProfile />} />




            {/* Catch All */}
            <Route path='*' element={<NotFound />} />


          </Routes>





        </BrowserRouter>

      </Context.Provider>


    </>

  );
}

export default App;
