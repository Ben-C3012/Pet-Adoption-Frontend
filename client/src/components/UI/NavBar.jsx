
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
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

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

    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();


    const value = useContext(Context);
    const { loggedIn, isLoggedIn } = value

    console.log('Logged In:', loggedIn)

    const handleAcountSettings = () => {
        navigate('/settings')
    }



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
                                        src={'https://avatars.dicebear.com/api/male/username.svg'}
                                    />
                                </MenuButton>
                                <MenuList alignItems={'center'}>
                                    <br />
                                    <Center>
                                        <Avatar
                                            size={'2xl'}
                                            src={'https://avatars.dicebear.com/api/male/username.svg'}
                                        />
                                    </Center>
                                    <br />
                                    <Center>
                                        <p>Username</p>
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                    {loggedIn && <MenuItem>Your Pets</MenuItem>}
                                    {loggedIn && <MenuItem onClick={handleAcountSettings}>Account Settings</MenuItem>}
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