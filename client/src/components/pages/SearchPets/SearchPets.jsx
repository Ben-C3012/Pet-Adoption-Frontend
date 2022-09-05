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
    Center,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom'
import { useState, useContext, useRef } from 'react';
import { Context } from '../../../App';
import PetCard from '../Pets/PetCard';
const axios = require('axios').default;

export default function SearchPets() {
    const value = useContext(Context)
    const { loggedIn } = value
    const navigate = useNavigate()
    const handleHome = () => loggedIn ? navigate('/main') : navigate('/')

    const [checkbox, setCheckbox] = useState(false)
    const handleCheckbox = () => setCheckbox(!checkbox)

    const [pets, setPets] = useState([])
    const [query, setQuery] = useState('')

    const buttonRef = useRef(null)

    const formik = useFormik({
        initialValues: {
            type: '',
            adoptionStatus: '',
            weight: '',
            height: '',
            name: ''
        }
    })

    // console.log(formik.values)

    // Bacic Search
    const handleSearch = () => {
        axios.get(`http://localhost:8080/api/v1/pets/?type=${formik.values.type}`)
            .then(res => {
                const data = res.data.data.pets
                setPets(data)

            })
            .catch(err => console.log(err))
    }


    //  Advanced Search
    const handleAdvancedSearch = () => {
        setQuery('')

        let updateQuery = '';
        if (formik.values.adoptionStatus) updateQuery += `&adoptionStatus=${formik.values.adoptionStatus}`;
        if (formik.values.weight) updateQuery += `&weight=${formik.values.weight}`;
        if (formik.values.height) updateQuery += `&height=${formik.values.height}`;
        if (formik.values.name) updateQuery += `&name=${formik.values.name}`;
        setQuery(updateQuery);

        console.log('Query', updateQuery)

        buttonRef.current.click()
        axios.get(`http://localhost:8080/api/v1/pets/?type=${formik.values.type}${updateQuery}`)
            .then(res => {
                setPets(res.data.data.pets)
                // console.log(pets)

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
                        <Button onClick={handleHome} position={'absolute'} top={'1'} right={'8.6rem'} colorScheme='orange' variant='solid'>
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


                            <FormControl>
                                <FormLabel>Type</FormLabel>
                                <Select onChange={formik.handleChange} value={formik.values.type} placeholder=' Select Type' name='type' >
                                    <option value='Dog'>Dog</option>
                                    <option value='Cat'>Cat</option>
                                </Select>
                            </FormControl>


                            {checkbox &&

                                <>

                                    <FormControl onChange={formik.handleChange} value={formik.values.adoptionStatus} name='adoptionStatus' >
                                        <FormLabel>Adoption Status</FormLabel>
                                        <Select placeholder=' Select Adoption Status' name='adoptionStatus'  >
                                            <option value='Available'>Available</option>
                                            <option value='Fostered'>Fostered</option>
                                            <option value='Adopted'>Adopted</option>
                                        </Select>
                                    </FormControl>



                                    <FormControl>
                                        <FormLabel>Weight</FormLabel>
                                        <Input onChange={formik.handleChange} value={formik.values.weight} min={0} type={'number'} name={'weight'} />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Height</FormLabel>
                                        <Input onChange={formik.handleChange} value={formik.values.height} min={0} type={'number'} name={'height'} />
                                    </FormControl>


                                    <FormControl>
                                        <FormLabel>Name</FormLabel>
                                        <Input onChange={formik.handleChange} value={formik.values.name} type={'text'} name='name' />
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
                                        ref={buttonRef}
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

                </Stack>


                <Flex justify={'center'} color='white' w={'100%'} wrap='wrap'>




                    {pets && pets.map(pet => {

                        return <Center key={pet._id} w='500px' h={'500px'} >
                            <PetCard type={pet.type} petName={pet.name} adoptionStatus={pet.adoptionStatus} bio={pet.bio}
                                breed={pet.breed} color={pet.color} dietaryRestrictions={pet.dietaryRestrictions} picture={pet.photo} id={pet._id} />
                        </Center>
                    })}


                </Flex>

            </Flex>










        </>

    );
}