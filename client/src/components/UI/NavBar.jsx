import { NavLink } from "react-router-dom"
import LoginRegister from "../LoginRegister/LoginRegisterModal"
import './NavBar.css'
import { Button, Text } from '@chakra-ui/react'
import { FaBone } from 'react-icons/fa';



function NavBar() {


    return (

        <div className="nav-container">

            <span className="logo-container">
               <h1 className="heading">Pet Adoption</h1>

            </span>

            <div>
                <ul className='nav-links'>
                    <li id="search">
                        <NavLink activeclassname="active" className='Search' to='/pets'><Button color={'black'} bg={'orange.400'} variant={'solid'}>Search Pets</Button></NavLink>
                    </li>

                    <li>
                        <LoginRegister />
                    </li>
                </ul>
            </div>
        </div>

    )
}

export default NavBar