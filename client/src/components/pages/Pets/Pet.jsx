import {
    Badge,
    Button,
    Center,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import { useContext } from 'react';
import { Context } from '../../../App';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Pet() {
    const navigate = useNavigate()
    const value = useContext(Context);
    const { loggedIn, isLoggedIn } = value

    const [pet, setPet] = useState({})
    const [id, setId] = useState('')

    const [saved, setSaved] = useState(false)
    const [petName, setPetName] = useState('')

    const [adopted, setAdopted] = useState(false)
    const [currentPets, setCurrentPets] = useState(false)

    const handleBackToSearch = () => navigate('/pets', { replace: true })

    useEffect(() => {
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });

        let petId = params.id;
        setId(petId)

        axios.get(`http://localhost:8080/api/v1/pets/${petId}`)
            .then(res => {
                const data = res.data.data.pet
                setPetName(res.data.data.pet.name)
                setPet(data)
            })
            .catch(err => console.log(err))
    }, [])



    // Get Users Saved Pets
    useEffect(() => {
        axios({
            method: 'POST',
            url: 'http://localhost:8080/api/v1/users/isloggedin',
            withCredentials: true
        })
            .then(res => {

                const arr = res.data.user.savedPets
                const found = arr.some(pet => pet.name == petName)
                if (!found) setSaved(true)

                // const userCurrentPets = res.data.user.currentPets
                // console.log(userCurrentPets)
                // const doesOwnPet = userCurrentPets.find(pet => pet.name === petName)
                // console.log(doesOwnPet) 

            })
            .catch(err => console.log(err.message))





    }, [])


    const handleSavePet = () => {
        axios({
            method: 'PATCH',
            url: `http://localhost:8080/api/v1/pets/${id}/save`,
            withCredentials: true
        })

            .then(res => {
                console.log(res)
                setSaved(true)

            })
            .catch(err => console.log(err))
    }


    const handleUnsavePet = () => {
        axios({
            method: 'DELETE',
            url: `http://localhost:8080/api/v1/pets/${id}/save`,
            withCredentials: true
        })

            .then(res => {
                console.log(res)
                setSaved(false)

            })
            .catch(err => console.log(err))
    }


    const handleAdoptClick = () => {
        axios({
            method: 'PATCH',
            url: `http://localhost:8080/api/v1/pets/${id}/adopt`,
            withCredentials: true
        })

            .then(res => {
                console.log(res)
                setAdopted(true)
            })

            .catch(err => console.log(err))
    }


    // const handleReturnPet = () => {
    //     axios({
    //         method: 'POST',
    //         url: `http://localhost:8080/api/v1/pets/return/${id}`,
    //         withCredentials: true
    //     })

    //     .then(res => {
    //         console.log(res)
    //         setAdopted(false)
    //     })
    // }




    return (
        <Center py={6}>
            <Button onClick={handleBackToSearch} position={'absolute'} top={'3'} right={'10rem'}>Back To Search</Button>
            <Stack
                borderWidth="1px"
                borderRadius="lg"
                w={{ sm: '100%', md: '450px' }}
                height={{ sm: '50rem', md: '50rem' }}
                direction={{ base: 'column', md: 'column' }}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                padding={4}>
                <Flex flex={1} bg="blue.200">
                    <Image
                        boxShadow={
                            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                        }
                        objectFit="cover"
                        boxSize="100%"
                        src={
                            pet.photo
                        }
                    />
                </Flex>
                <Stack
                    flex={1}
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    p={1}
                    pt={2}>
                    <Heading fontSize={'2xl'} fontFamily={'body'}>
                        {pet.name}
                    </Heading>
                    <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
                        {pet.breed}
                    </Text>
                    <Text fontWeight={600} color={'gray.200'} size="sm" mb={4}>
                        {pet.adoptionStatus}
                    </Text>
                    <Text
                        textAlign={'center'}
                        color={useColorModeValue('gray.700', 'gray.400')}
                        px={3}>
                        {pet.bio}
                    </Text>
                    <Stack align={'center'} justify={'center'} direction={'column'} mt={6}>


                        <Badge
                            px={2}
                            py={1}
                            bg={useColorModeValue('gray.100', 'gray.800')}
                            fontWeight={'400'} fontSize={'md'}>
                            Height: {pet.height}cm
                        </Badge>
                        <Badge
                            px={2}
                            py={1}
                            bg={useColorModeValue('gray.100', 'gray.800')}
                            fontWeight={'400'} fontSize={'md'}>
                            Weight: {pet.weight}kg
                        </Badge>



                        <Badge
                            px={2}
                            py={1}
                            bg={useColorModeValue('gray.100', 'gray.800')}
                            fontWeight={'400'} fontSize={'md'}>
                            Color: {pet.color}
                        </Badge>
                        <Badge
                            px={2}
                            py={1}
                            bg={useColorModeValue('gray.100', 'gray.800')}
                            fontWeight={'400'} fontSize={'md'}>
                            DietaryRestrictions {pet.dietaryRestrictions}
                        </Badge>


                    </Stack>

                    <Stack

                        width={'100%'}
                        mt={'2rem'}
                        direction={'row'}
                        padding={2}
                        justifyContent={'space-between'}
                        alignItems={'center'}>
                        {loggedIn && <Button
                            bg={'orange.400'}
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                            _hover={{
                                bg: 'orange.300',
                            }}
                            _focus={{
                                bg: 'orange.200',

                            }}
                            color={'white'}
                        >

                            Foster
                        </Button>}

                        {loggedIn && <Button
                            onClick={handleAdoptClick}
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                            bg={'blue.400'}
                            color={'white'}

                            _hover={{
                                bg: 'blue.500',
                            }}
                            _focus={{
                                bg: 'blue.300',
                            }}>
                            Adpot
                        </Button>}

                        {loggedIn && !saved && <Button
                            onClick={handleSavePet}
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                            bg={'gray.500'}
                            color={'white'}
                            _hover={{
                                bg: 'gray.600',
                            }}
                            _focus={{
                                bg: 'gray.500',
                            }}>

                            Save For Later

                        </Button>}



                        {loggedIn && saved && <Button
                            onClick={handleUnsavePet}
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                            bg={'gray.500'}
                            color={'white'}
                            _hover={{
                                bg: 'gray.600',
                            }}
                            _focus={{
                                bg: 'gray.500',
                            }}>

                            Unsave

                        </Button>}



                    </Stack>
                    {!loggedIn && <Center textAlign={'center'}>Log In To Adopt / Foster</Center>}
                </Stack>
            </Stack>
        </Center >
    );
}