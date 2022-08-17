import { NavLink } from "react-router-dom"
import LoginRegister from "../LoginRegister/LoginRegisterModal"
import './NavBar.css'
import { Button } from '@chakra-ui/react'


function NavBar() {


    return (

        <div className="nav-container">
            <ul className='nav-links'>
                <li id="search">
                    <NavLink activeclassname="active" className='Search' to='/pets'><Button color={'black'} bg={'teal.400'} variant={'outline'}>Search Pets</Button></NavLink>
                </li>

                <li>
                    <LoginRegister />
                </li>
            </ul>
        </div>

    )
}

export default NavBar