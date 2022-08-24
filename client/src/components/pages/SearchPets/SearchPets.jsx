import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Select,

} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import PetCard from '../Pets/PetCard';
const axios = require('axios').default;

export default function SearchPets() {
    const navigate = useNavigate()
    const handleHome = () => navigate('/', { replace: true })
    const [checkbox, setCheckbox] = useState(false)
    const handleCheckbox = () => setCheckbox(!checkbox)

    const [pets, setPets] = useState([])


    // Form States
    const [type, setType] = useState('')
    const [adoptionStatus, setAdoptionStatus] = useState('')
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [name, setName] = useState('')

    // Form Handlers
    const handleType = (e) => setType(e.target.value)
    const handleAdoptionStatus = (e) => setAdoptionStatus(e.target.value)
    const handleWeight = (e) => setWeight(e.target.value)
    const handleHeight = (e) => setHeight(e.target.value)
    const handleName = (e) => setName(e.target.value)


    // Search Handlers
    const handleSearch = () => {
        axios.get(`http://localhost:8080/api/v1/pets/?type=${type}`)
            .then(res => {
                console.log(res.data.data.pets)
                const data = res.data.data.pets
                setPets(data)

            })
            .catch(err => console.log(err))
    }

    const handleAdvancedSearch = () => {
        axios.get(`http://localhost:8080/api/v1/pets/?type=${type}&adoptionStatus=${adoptionStatus}&name=${name}&weight=${weight}&height=${height}`)
            .then(res => {
                console.log(res.data.data.pets)
                setPets(res.data.data.pets)
            })
            .catch(err => console.log(err))
    }





    return (


        <>

            <Flex
                minH={'100vh'}
                align={'start'}
                justify={'start'}
                direction={'column'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'xl '} width={'xl'} py={12} px={6}>
                    <Stack align={'center'}>

                        <Heading fontSize={'4xl'}>Search For Pets</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            To enjoy all of our cute  <Link color={'blue.400'}>animals</Link> 🐶
                        </Text>
                        <Button onClick={handleHome} position={'absolute'} top={'1'} right={'10rem'} colorScheme='orange' variant='solid'>
                            Back To Home
                        </Button>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>

                            <Checkbox onChange={handleCheckbox}>Advanced Search</Checkbox>


                            <FormControl onChange={handleType}>
                                <FormLabel>Type</FormLabel>
                                <Select placeholder=' Select Type'>
                                    <option value='Dog'>Dog</option>
                                    <option value='Cat'>Cat</option>
                                </Select>
                            </FormControl>


                            {checkbox &&

                                <>

                                    <FormControl onChange={handleAdoptionStatus}>
                                        <FormLabel>Adoption Status</FormLabel>
                                        <Select placeholder=' Select Adoption Status'>
                                            <option value='Available'>Available</option>
                                            <option value='Fostered'>Fostered</option>
                                            <option value='Adopted'>Adopted</option>
                                        </Select>
                                    </FormControl>



                                    <FormControl onChange={handleWeight}>
                                        <FormLabel>Weight</FormLabel>
                                        <Input type={'number'} />
                                    </FormControl>

                                    <FormControl onChange={handleHeight}>
                                        <FormLabel>Height</FormLabel>
                                        <Input min={0} type={'number'} />
                                    </FormControl>


                                    <FormControl onChange={handleName}>
                                        <FormLabel>Name</FormLabel>
                                        <Input type={'name'} />
                                    </FormControl>
                                </>
                            }

                            <Stack spacing={10}>

                                {!checkbox ? <Button
                                    onClick={handleSearch}
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Search
                                </Button>

                                    :
                                    <Button
                                        onClick={handleAdvancedSearch}
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}>
                                        Search
                                    </Button>
                                }


                            </Stack>
                        </Stack>
                    </Box>

                    {pets && pets.map(pet => {
                        return <PetCard key={pet._id} type={pet.type} petName={pet.name} adoptionStatus={pet.adoptionStatus} bio={pet.bio}
                            breed={pet.breed} color={pet.color} dietaryRestrictions={pet.dietaryRestrictions} picture={pet.photo} id={pet._id} />
                    })}



                </Stack>
            </Flex>









        </>

    );
}