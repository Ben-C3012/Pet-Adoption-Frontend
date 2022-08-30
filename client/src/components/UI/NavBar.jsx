
import {
    Box,
    Flex,
    Avatar,
    Link,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
    Text
} from '@chakra-ui/react';
import { BsFillMoonFill } from 'react-icons/bs'
import { FaSun } from 'react-icons/fa'
import LoginRegisterModal from '../LoginRegister/LoginRegisterModal'
import { Context } from '../../App';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavLink = ({ children }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'underline',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
    </Link>
);

export default function NavBar() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [photo, setPhoto] = useState('')


    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const value = useContext(Context);
    const { loggedIn, isLoggedIn, admin, isAdmin } = value

  


    const handleAcountSettings = () => navigate('/settings')

    const handleLogOut = () => {
        axios({
            method: 'GET',
            url: 'http://localhost:8080/api/v1/users/logout',
            withCredentials: true
        })

            .then(res => {
                isLoggedIn(false)
                navigate('/')
                window.location.reload()
            })
            .catch(err => console.log(err.message))
    }



    useEffect(() => {
        axios({
            method: 'POST',
            url: 'http://localhost:8080/api/v1/users/isloggedin',
            withCredentials: true
        })

            .then(res => {
                const { name, photo, role } = res.data.user
                if (role === 'admin') isAdmin(true)
                setName(name)
                setPhoto(photo)

            })
            .catch(err => console.log(err.message))
    }, [])


    const handleYourPetsClick = () => navigate('/myPets')
    const handleAddPetClick = () => navigate('/addPet')
    const handleDashboaredClick = () => navigate('/dashboared')
    const HandleHomeClick = () => loggedIn ? navigate('/main') : navigate('/home')


    return (
        <>
            <Box bg={useColorModeValue('teal.400', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>
                        <Text color={'white'} mb={2} className='logo' fontSize='3xl'>Pet Adoption</Text>
                    </Box>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <BsFillMoonFill /> : <FaSun />}
                            </Button>

                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={photo}
                                    />
                                </MenuButton>
                                <MenuList alignItems={'center'}>
                                    <br />
                                    <Center>
                                        <Avatar
                                            size={'2xl'}
                                            src={photo}
                                        />
                                    </Center>
                                    <br />
                                    <Center>
                                        {loggedIn ? name : <p>Log In</p>}
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                    {loggedIn && <MenuItem onClick={HandleHomeClick}>Home</MenuItem>}
                                    {admin && <MenuItem onClick={handleDashboaredClick}>Dashboared</MenuItem>}
                                    {admin && <MenuItem onClick={handleAddPetClick}>Add Pet</MenuItem>}
                                    {loggedIn && <MenuItem onClick={handleYourPetsClick}>Your Pets</MenuItem>}
                                    {loggedIn && <MenuItem onClick={handleAcountSettings}>Account Settings</MenuItem>}
                                    {loggedIn && <MenuItem onClick={handleLogOut}>Log Out</MenuItem>}
                                    <MenuItem>

                                        {!loggedIn && <LoginRegisterModal></LoginRegisterModal>}


                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}