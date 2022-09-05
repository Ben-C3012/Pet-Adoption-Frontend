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
import AdminEditModal from './AdminEditModal';
import AdminEditPicture from './AdminEditPicture';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Heart from "react-animated-heart";

export default function Pet() {
    const navigate = useNavigate()
    const value = useContext(Context);
    const { loggedIn, admin } = value


    const [isClick, setClick] = useState(false);   // Heart Icon State

    const [pet, setPet] = useState({})
    const [id, setId] = useState('')
    const [petName, setPetName] = useState('')

    const [saved, setSaved] = useState(false)
    const [adopted, setAdopted] = useState(false)
    const [fostered, setFostered] = useState(false)

    const [isOwner, setIsOwner] = useState(false)
    const [taken, setTaken] = useState(false)

    const handleBackToSearch = () => navigate('/pets', { replace: true })
    // Get Id From Param + Pet Data
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
                console.log(data.adoptionStatus)
                if (data.adoptionStatus == 'Fostered') setTaken(true)
                if (data.adoptionStatus == 'Adopted') setTaken(true)
                console.log('Taken', taken)
            })
            .catch(err => console.log(err))

        // Get Saved + Current Pets
        axios({
            method: 'GET',
            url: 'http://localhost:8080/api/v1/pets/user/1111',
            withCredentials: true
        })

            .then(res => {
                // Saved Pet 
                const result = res.data
                const { savedPets, currentPets } = result
                const findIfPetSaved = savedPets.find(pet => pet._id === petId)
                if (findIfPetSaved) setSaved(true)
                if (findIfPetSaved) setClick(true)

                // Check if the user is the current owner of the pet
                const findIfUserOwnsPet = currentPets.find(pet => pet._id === petId)
                if (findIfUserOwnsPet) setIsOwner(true)
                console.log('isOwner', isOwner)
                if (findIfUserOwnsPet) setAdopted(true)
                if (taken && !isOwner) toast('This Pet Is Taken!')
            })
    }, [adopted, fostered])

    const handleSavePet = () => {
        axios({
            method: 'PATCH',
            url: `http://localhost:8080/api/v1/pets/${id}/save`,
            withCredentials: true
        })
            .then(res => {
                setSaved(true)
                toast('Pet Saved!')
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
                setSaved(false)
                toast.info('Pet Unsaved')
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
                toast.success('Pet Adopted')
            })

            .catch(err => console.log(err))
    }

    const handleFosterPet = () => {
        axios({
            method: 'PATCH',
            url: `http://localhost:8080/api/v1/pets/${id}/adopt`,
            withCredentials: true,
            data: {
                foster: 'foster'
            },


        })

            .then(res => {
                console.log(res)
                setFostered(true)
                toast.success('Pet Fostered!')
            })
    }

    const handleReturnPet = () => {
        axios({
            method: 'POST',
            url: `http://localhost:8080/api/v1/pets/return/${id}`,
            withCredentials: true
        })

            .then(res => {
                console.log(res)
                setAdopted(false)
                setFostered(false)
                setTaken(false)
                toast('Pet Returned')
            })
    }

    return (
        <Center py={6}>
            <Button onClick={handleBackToSearch} position={'absolute'} top={'3'} right={'10rem'}>Back To Search</Button>
            <Stack
                borderWidth="1px"
                borderRadius="lg"
                w={{ sm: '100%', md: '800px' }}
                height={'60rem'}
                direction={{ base: 'column', md: 'column' }}
                bg={useColorModeValue('gray.50', 'gray.900')}
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
                        {petName}
                    </Heading>

                    <Text fontWeight={600} color={'gray.600'} size="sm" mb={4}>
                        {pet.breed}
                    </Text>

                    <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
                        {pet.adoptionStatus}
                    </Text>

                    <Text
                        textAlign={'center'}

                        color={useColorModeValue('gray.700', 'gray.400')}
                        px={3}>
                        {pet.bio}
                    </Text>

                    <Stack align={'center'} justify={'center'} direction={{ sm: 'column', md: 'row' }} mt={6}>

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
                            Dietary Restrictions {pet.dietaryRestrictions}
                        </Badge>

                    </Stack>

                    <Stack
                        width={'100%'}
                        mt={'2rem'}
                        direction={'row'}
                        padding={2}
                        justifyContent={'space-between'}
                        alignItems={'center'}>

                        {loggedIn && !fostered && !adopted && <Button
                            disabled={taken ? true : false}
                            onClick={handleFosterPet}
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
                            color={'white'}>

                            Foster
                        </Button>}

                        {loggedIn && fostered && <Button
                            onClick={handleReturnPet}
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
                        > Return  From Foster
                        </Button>}

                        {loggedIn && !adopted && <Button
                            disabled={taken ? true : false}
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

                        {loggedIn && adopted && !fostered && <Button
                            onClick={handleReturnPet}
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                            color={'white'}
                            bg={'teal.500'}
                            _hover={{
                                bg: 'teal.600',
                            }}
                            _focus={{
                                bg: 'teal.700',
                            }}>
                            Return
                        </Button>}

                        {loggedIn && !saved && <Button
                            // onClick={handleSavePet}
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                            color={'white'}
                            bg={'gray.700'}
                            _hover={{
                                bg: 'gray.600',
                            }}
                            _focus={{
                                bg: 'gray.500',
                            }}>

                            <Heart isClick={isClick} onClick={() => {
                                setClick(true)
                                handleSavePet()
                            }} />
                        </Button>}

                        {loggedIn && saved && <Button
                            // onClick={handleUnsavePet}
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                            bg={'gray.700'}
                            color={'white'}
                            _hover={{
                                bg: 'gray.600',
                            }}
                            _focus={{
                                bg: 'gray.500',
                            }}>

                            <Heart isClick={isClick} onClick={() => {
                                setClick(false)
                                handleUnsavePet()
                            }} />

                        </Button>}

                    </Stack>
                    {!adopted && <Text></Text>}
                    {!loggedIn && <Center textAlign={'center'}>Log In To Adopt / Foster</Center>}
                </Stack>

                <Flex justify={'center'} align={'center'} >

                    {admin && <AdminEditModal pet={pet} />}
                    {admin && <AdminEditPicture pet={pet} />}
                    <ToastContainer />

                </Flex>

            </Stack>
            
        </Center >
    );
}