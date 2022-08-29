import {
    Box,
    Stack,
    HStack,
    Heading,
    Text,
    VStack,
    useColorModeValue,
    List,
    ListItem,
    ListIcon,
    Button,
    Avatar,
    Flex,
    Tooltip,
    Icon,
    chakra,


} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons'
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Acordion from './Acordion';


function PriceWrapper({ children }) {
    return (
        <Box
            mb={4}
            shadow="base"
            borderWidth="1px"
            alignSelf={{ base: 'center', lg: 'flex-start' }}
            borderColor={useColorModeValue('gray.200', 'gray.500')}
            borderRadius={'xl'}>
            {children}
        </Box>
    );
}

export default function User(props) {
    const { name, email, phoneNumber, photo, role, id, savedPets, currentPets } = props
    const navigate = useNavigate()
    const [user, setUser] = useState('')


    const handleClick = (event) => {
        navigate({ pathname: '/user', search: `?id=${id}` });
    }

    // const handleClick = (event) => {
    //     const id = event.currentTarget.id

    //     axios({
    //         method: 'GET',
    //         url: `http://localhost:8080/api/v1/users/${id}`,
    //         withCredentials: true
    //     })

    //     .then(res => {
    //         setUser(res)
    //         console.log(user)
    //     })
    // }



    return (
        <Box py={12} >
            <VStack spacing={2} textAlign="center">


            </VStack>
            <Stack
                // direction={{ base: 'row', md: 'row' }}
                direction={'row'}
                textAlign="center"
                justify="center"
                spacing={{ base: 1, lg: 10 }}
                py={10}>


                <PriceWrapper>
                    <Box position="relative">
                        <Box
                            position="absolute"
                            top="-16px"
                            left="50%"
                            style={{ transform: 'translate(-50%)' }}>

                        </Box>
                        <Box py={4} px={12} w={'30rem '}>

                            <HStack justifyContent="center" >

                                <Avatar
                                    size={'xl'}
                                    src={
                                        photo
                                    }
                                    alt={'Author'}
                                    css={{
                                        border: '2px solid white',
                                    }}
                                />


                            </HStack>
                        </Box>

                        <Text p={2} fontSize={'lg'}>{name}</Text>

                        <VStack
                            bg={useColorModeValue('gray.50', 'gray.700')}
                            py={4}
                            borderBottomRadius={'xl'}>
                            <List spacing={3} textAlign="start" px={12}>
                                <ListItem>
                                    <ListIcon as={FaCheckCircle} color="green.500" />
                                    {email}
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={FaCheckCircle} color="green.500" />
                                    {phoneNumber}
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={FaCheckCircle} color="green.500" />
                                    {role}
                                </ListItem>
                            </List>


                           

                            <Box w="80%" pt={7}>
                                <Button id={id} w="full" colorScheme="messenger">
                                    More Info
                                </Button>

                                <Acordion savedPets={savedPets} currentPets={currentPets} ></Acordion>

                            </Box>
                        </VStack>
                    </Box>
                </PriceWrapper>

            </Stack>
        </Box>
    );
}